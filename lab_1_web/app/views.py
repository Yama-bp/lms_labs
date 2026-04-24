from flask import Blueprint, render_template
from app.models import Game, Publisher, GamePublisher
from structures.extension import db
from sqlalchemy import func, desc

main = Blueprint('main', __name__)

@main.route('/')
def index():
    games = Game.query.all()
    publishers = Publisher.query.all()
    return render_template('index.html', games=games, publishers=publishers)

@main.route('/games')
def games():
    games = Game.query.order_by(Game.player_count.desc()).all()
    return render_template('games.html', games=games)

@main.route('/publishers')
def publishers():
    publishers = Publisher.query.all()
    return render_template('publishers.html', publishers=publishers)

@main.route('/queries')
def queries():
    # ЗАПРОС 1: Топ-10 самых популярных игр
    query1 = (db.session.query(
        Game.title,
        Game.player_count,
        Game.player_count_type
    )
    .order_by(Game.player_count.desc())
    .limit(10)
    .all())
    
    # ЗАПРОС 2: Статистика по типам подсчета
    query2 = (db.session.query(
        Game.player_count_type,
        func.count(Game.id).label('count'),
        func.avg(Game.player_count).label('avg'),
        func.max(Game.player_count).label('max'),
        func.min(Game.player_count).label('min')
    )
    .group_by(Game.player_count_type)
    .all())
    
    # ЗАПРОС 3: Издатели с наибольшим количеством игр
    query3 = (db.session.query(
        Publisher.name,
        func.count(GamePublisher.game_id).label('game_count'),
        func.avg(Game.player_count).label('avg_popularity')
    )
    .join(GamePublisher, GamePublisher.publisher_id == Publisher.id)
    .join(Game, Game.id == GamePublisher.game_id)
    .group_by(Publisher.name)
    .order_by(desc('game_count'))
    .limit(10)
    .all())
    
    # ЗАПРОС 4: Издатели с >2 игр и >50M игроков
    query4 = (db.session.query(
        Publisher.name,
        func.count(GamePublisher.game_id).label('game_count'),
        func.avg(Game.player_count).label('avg_popularity')
    )
    .join(GamePublisher, GamePublisher.publisher_id == Publisher.id)
    .join(Game, Game.id == GamePublisher.game_id)
    .filter(Game.player_count > 50)
    .group_by(Publisher.name)
    .having(func.count(GamePublisher.game_id) > 2)
    .order_by(desc('avg_popularity'))
    .all())
    
    # ЗАПРОС 5: Самая популярная игра каждого издателя
    subquery = (db.session.query(
        GamePublisher.publisher_id,
        func.max(Game.player_count).label('max_popularity')
    )
    .join(Game, Game.id == GamePublisher.game_id)
    .group_by(GamePublisher.publisher_id)
    .subquery())
    
    query5 = (db.session.query(
        Publisher.name.label('publisher'),
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
    
    return render_template('queries.html', 
                         query1=query1,
                         query2=query2,
                         query3=query3,
                         query4=query4,
                         query5=query5)