from flask import Flask
from structures.config import DevelopmentConfig
from structures.extension import db, ma
from app.models import Game, Publisher, GamePublisher
from app.views import main
from app.load_data import load_data
from app.queries import execute_queries

# Импортируем маршруты для API
from app.routes import title, games, aggregate

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    
    # Настройка вывода JSON с русскими буквами
    app.json.ensure_ascii = False
    
    # Регистрация Blueprint-ов для веб-интерфейса
    app.register_blueprint(main)
    
    # Регистрация Blueprint-ов для API
    app.register_blueprint(title.bp_title, url_prefix="/api/v1/title")
    app.register_blueprint(games.games_bp, url_prefix="/api/v1/games")
    app.register_blueprint(aggregate.aggregate_bp, url_prefix="/api/v1/aggregate")
    
    # Инициализация расширений
    db.init_app(app)
    ma.init_app(app)
    
    with app.app_context():
        db.create_all()
        
        # Загружаем данные, если таблицы пусты
        if Game.query.count() == 0:
            print("Загрузка данных...")
            load_data()
        
        # Выполняем консольные запросы
        execute_queries()
    
    return app