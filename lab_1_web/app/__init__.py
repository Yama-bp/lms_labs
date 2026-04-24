from flask import Flask
from structures.config import DevelopmentConfig
from structures.extension import db
from app.models import Publisher, Game
from app.views import main
from app.load_data import load_data
from app.queries import execute_queries

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    
    app.register_blueprint(main)
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        
        # Загружаем данные, если таблицы пусты
        if Game.query.count() == 0:
            print("Загрузка данных...")
            load_data()
        
        # Выполняем запросы
        execute_queries()
    
    return app