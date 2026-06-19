from structures.extension import db
from app.models.game import Game
from app.models.publisher import Publisher
from app.models.game_publisher import GamePublisher
from sqlalchemy import func

def get_stat_by_publisher():
    results = (
        db.session.query(
            Publisher.name.label("name"),
            func.avg(Game.player_count).label("avg_popularity"),
            func.max(Game.player_count).label("max_popularity"),
            func.min(Game.player_count).label("min_popularity"),
            func.count(Game.id).label("count")
        )
        .join(GamePublisher, GamePublisher.publisher_id == Publisher.id)
        .join(Game, Game.id == GamePublisher.game_id)
        .group_by(Publisher.name)
        .order_by(Publisher.name)
        .all()
    )
    return [
        {"name": r.name, "avg_popularity": round(r.avg_popularity or 0, 2),
         "max_popularity": r.max_popularity or 0, "min_popularity": r.min_popularity or 0, "count": r.count}
        for r in results
    ]

def get_stat_by_year():
    results = (
        db.session.query(
            Game.release_year.label("name"),
            func.avg(Game.player_count).label("avg_popularity"),
            func.max(Game.player_count).label("max_popularity"),
            func.min(Game.player_count).label("min_popularity"),
            func.count(Game.id).label("count")
        )
        .filter(Game.release_year != None)
        .group_by(Game.release_year)
        .order_by(Game.release_year)
        .all()
    )
    return [
        {"name": str(r.name), "avg_popularity": round(r.avg_popularity or 0, 2),
         "max_popularity": r.max_popularity or 0, "min_popularity": r.min_popularity or 0, "count": r.count}
        for r in results
    ]

def get_stat_by_type():
    results = (
        db.session.query(
            Game.count_type.label("name"),
            func.avg(Game.player_count).label("avg_popularity"),
            func.max(Game.player_count).label("max_popularity"),
            func.min(Game.player_count).label("min_popularity"),
            func.count(Game.id).label("count")
        )
        .group_by(Game.count_type)
        .order_by(Game.count_type)
        .all()
    )
    return [
        {"name": r.name or "Unknown", "avg_popularity": round(r.avg_popularity or 0, 2),
         "max_popularity": r.max_popularity or 0, "min_popularity": r.min_popularity or 0, "count": r.count}
        for r in results
    ]