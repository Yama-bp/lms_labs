from app.models import Game, Publisher, GamePublisher
from structures.extension import db
from sqlalchemy import func, desc

def execute_queries():
    """Выполняет 5 запросов по заданию"""
    
    print("\n" + "="*80)
    print("ЗАПРОС 1: Игры с фильтрацией и сортировкой")
    print("="*80)
    print("Топ-10 самых популярных игр (по количеству игроков)")
    
    result1 = (db.session.query(
        Game.title,
        Game.player_count,
        Game.player_count_type,
        Game.release_date
    )
    .filter(Game.player_count > 100)
    .order_by(desc(Game.player_count))
    .limit(10)
    .all())
    
    for i, row in enumerate(result1, 1):
        print(f"{i:2}. {row.title[:40]:40} | {row.player_count:4}M {row.player_count_type:15} | {row.release_date}")
    
    print("\n" + "="*80)
    print("ЗАПРОС 2: Вычисление по строкам")
    print("="*80)
    print("Годы выпуска игр и их возраст (на 2025 год)")
    
    result2 = (db.session.query(
        Game.title,
        Game.release_date
    )
    .filter(Game.release_date != '')
    .limit(15)
    .all())
    
    for row in result2:
        year = None
        if row.release_date and len(row.release_date) >= 4:
            try:
                year = int(row.release_date[-4:]) if row.release_date[-4:].isdigit() else None
            except:
                year = None
        
        age = 2025 - year if year else "?"
        print(f"{row.title[:40]:40} | Год: {row.release_date:15} | Возраст: {age} лет")
    
    print("\n" + "="*80)
    print("ЗАПРОС 3: Группировка и агрегатные функции")
    print("="*80)
    print("Статистика по типам подсчета игроков")
    
    result3 = (db.session.query(
        Game.player_count_type,
        func.count(Game.id).label("количество_игр"),
        func.avg(Game.player_count).label("среднее_игроков"),
        func.max(Game.player_count).label("максимум"),
        func.min(Game.player_count).label("минимум")
    )
    .group_by(Game.player_count_type)
    .all())
    
    for row in result3:
        print(f"{row.player_count_type:20} | Игр: {row.количество_игр:3} | Среднее: {row.среднее_игроков:6.1f}M | Макс: {row.максимум:4}M | Мин: {row.минимум:4}M")
    
    print("\n" + "="*80)
    print("ЗАПРОС 4: Группировка с фильтрацией (HAVING)")
    print("="*80)
    print("Издатели, выпустившие больше 2 игр с >50M игроков")
    
    result4 = (db.session.query(
        Publisher.name,
        func.count(GamePublisher.game_id).label("количество_игр"),
        func.avg(Game.player_count).label("средняя_популярность")
    )
    .join(GamePublisher, GamePublisher.publisher_id == Publisher.id)
    .join(Game, Game.id == GamePublisher.game_id)
    .filter(Game.player_count > 50)
    .group_by(Publisher.name)
    .having(func.count(GamePublisher.game_id) > 2)
    .order_by(desc("количество_игр"))
    .all())
    
    for row in result4:
        print(f"{row.name:30} | Игр: {row.количество_игр:2} | Средняя популярность: {row.средняя_популярность:5.1f}M")
    
    print("\n" + "="*80)
    print("ЗАПРОС 5: Вложенный запрос (самые популярные игры каждого издателя)")
    print("="*80)
    
  
    subquery = (db.session.query(
        GamePublisher.publisher_id,
        func.max(Game.player_count).label("max_popularity")
    )
    .join(Game, Game.id == GamePublisher.game_id)
    .group_by(GamePublisher.publisher_id)
    .subquery())
    
    result5 = (db.session.query(
        Publisher.name.label("publisher"),
        Game.title,
        Game.player_count
    )
    .join(subquery, subquery.c.publisher_id == Publisher.id)
    .join(GamePublisher, GamePublisher.publisher_id == Publisher.id)
    .join(Game, (Game.id == GamePublisher.game_id) & 
          (Game.player_count == subquery.c.max_popularity))
    .order_by(desc(Game.player_count))
    .limit(15)
    .all())
    
    for row in result5:
        print(f"{row.publisher:30} | {row.title[:40]:40} | {row.player_count}M")