import csv
import os
import re
from structures.extension import db
from app.models import Publisher, Game, GamePublisher
from sqlalchemy import func

def parse_player_count(text):
    """Парсит строку с количеством игроков"""
    text = text.lower()
    
    numbers = re.findall(r'[\d.]+', text)
    if not numbers:
        return 0, "unknown"
    
    count = float(numbers[0])
    
    if 'billion' in text or ('b' in text and 'billion' not in text and text.endswith('b')):
        count *= 1000
        player_type = "total downloads"
    elif 'million' in text or 'm' in text:
        player_type = "total downloads"
    else:
        player_type = "unknown"
    
    if 'daily' in text:
        player_type = "daily players"
    elif 'monthly' in text:
        player_type = "monthly players"
    elif 'downloads' in text:
        player_type = "total downloads"
    
    return int(count), player_type

def load_data():
    """Загружает данные из CSV в базу"""
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'most_played_mobile_games.csv')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        publishers_cache = {}
        
        for row in reader:
            if not row['Game']:
                continue
            
            # Разделяем издателей
            publisher_names = [name.strip() for name in row['Publisher(s)'].split('/')]
            
            # Находим или создаем каждого издателя
            publisher_ids = []
            for pub_name in publisher_names:
                if pub_name not in publishers_cache:
                    publisher = Publisher.query.filter_by(name=pub_name).first()
                    if not publisher:
                        publisher = Publisher(pub_name)
                        db.session.add(publisher)
                        db.session.flush()
                    publishers_cache[pub_name] = publisher.id
                publisher_ids.append(publishers_cache[pub_name])
            
            # Парсим количество игроков
            player_count, player_type = parse_player_count(row['Player count[a]'])
            
            # Создаем игру
            game = Game(
                title=row['Game'],
                release_date=row['Release date'],
                as_of_date=row['As of'],
                player_count=player_count,
                player_count_type=player_type,
                notes=f"Ref: {row['Ref.']}" if row['Ref.'] else ""
            )
            db.session.add(game)
            db.session.flush()
            
            # Создаем связи между игрой и каждым издателем (как Building связывает City и TypeBuilding)
            for pub_id in publisher_ids:
                game_publisher = GamePublisher(game_id=game.id, publisher_id=pub_id)
                db.session.add(game_publisher)
        
        db.session.commit()
        print(f"\n Загружено игр: {Game.query.count()}")
        print(f" Загружено издателей: {Publisher.query.count()}")
        print(f" Загружено связей: {GamePublisher.query.count()}")
        
        # Проверка для совместных игр
        joint_count = db.session.query(GamePublisher.game_id).group_by(GamePublisher.game_id).having(func.count() > 1).count()
        print(f" Игр с несколькими издателями: {joint_count}")