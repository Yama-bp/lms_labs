from structures.extension import db
from app.models import Game, Publisher, GamePublisher
from sqlalchemy import func

# 2 выборка данных в виде вложенного JSON
def get_all_games_with_details():
    """Выборка всех игр с деталями (название, популярность, год)"""
    query = (
        db.session.query(
            Game.id,
            Game.title,
            Game.player_count.label("popularity"),
            Game.release_date.label("year")
        )
        .order_by(Game.player_count.desc())
    )
    results = query.all()
    keys = ['id', 'title', 'popularity', 'year']
    return [{k: getattr(r, k) for k in keys} for r in results]


# 3 группировка по издателям (макс, мин, среднее)
def get_stat_by_publisher():
    """Статистика по издателям: средняя, максимальная, минимальная популярность"""
    results = (
        db.session.query(
            Publisher.name.label("name"),
            func.avg(Game.player_count).label("avg_popularity"),
            func.max(Game.player_count).label("max_popularity"),
            func.min(Game.player_count).label("min_popularity"),
            func.count(Game.id).label("games_count")
        )
        .join(GamePublisher, GamePublisher.publisher_id == Publisher.id)
        .join(Game, Game.id == GamePublisher.game_id)
        .group_by(Publisher.name)
        .order_by(Publisher.name)
        .all()
    )
    return [{"name": r.name, 
             "avg_popularity": round(r.avg_popularity or 0, 2),
             "max_popularity": r.max_popularity or 0, 
             "min_popularity": r.min_popularity or 0,
             "games_count": r.games_count}
            for r in results]


# 3 группировка по типу подсчета (макс, мин, среднее)
def get_stat_by_type():
    """Статистика по типу подсчета игроков: средняя, максимальная, минимальная популярность"""
    results = (
        db.session.query(
            Game.player_count_type.label("name"),
            func.avg(Game.player_count).label("avg_popularity"),
            func.max(Game.player_count).label("max_popularity"),
            func.min(Game.player_count).label("min_popularity"),
            func.count(Game.id).label("count")
        )
        .group_by(Game.player_count_type)
        .order_by(Game.player_count_type)
        .all()
    )
    return [{"name": r.name or "Unknown", 
             "avg_popularity": round(r.avg_popularity or 0, 2),
             "max_popularity": r.max_popularity or 0, 
             "min_popularity": r.min_popularity or 0,
             "count": r.count}
            for r in results]


# 3 группировка по годам (макс, мин, среднее)
def get_stat_by_year():
    """Статистика по годам выпуска: средняя, максимальная, минимальная популярность"""
    results = (
        db.session.query(
            Game.release_date.label("name"),
            func.avg(Game.player_count).label("avg_popularity"),
            func.max(Game.player_count).label("max_popularity"),
            func.min(Game.player_count).label("min_popularity"),
            func.count(Game.id).label("count")
        )
        .filter(Game.release_date != None, Game.release_date != '')
        .group_by(Game.release_date)
        .order_by(Game.release_date)
        .limit(20)
        .all()
    )
    return [{"name": r.name, 
             "avg_popularity": round(r.avg_popularity or 0, 2),
             "max_popularity": r.max_popularity or 0, 
             "min_popularity": r.min_popularity or 0,
             "count": r.count}
            for r in results]