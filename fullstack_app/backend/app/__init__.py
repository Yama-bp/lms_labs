from flask import Flask
from flask_cors import CORS
from structures.config import DevelopmentConfig
from structures.extension import db, ma, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    app.json.ensure_ascii = False
    
    CORS(app)
    
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    
    from app.models.game import Game
    from app.models.publisher import Publisher
    from app.models.game_publisher import GamePublisher
    from app.models.quiz_type import QuizType
    from app.models.quiz_question import QuizQuestion
    from app.models.quiz_answer import QuizAnswer
    
    from app.routes.games import games_bp
    from app.routes.publishers import publishers_bp
    from app.routes.aggregate import aggregate_bp
    from app.routes.quiz import quiz_bp
    
    app.register_blueprint(games_bp, url_prefix='/api/v1/games')
    app.register_blueprint(publishers_bp, url_prefix='/api/v1/publishers')
    app.register_blueprint(aggregate_bp, url_prefix='/api/v1/aggregate')
    app.register_blueprint(quiz_bp, url_prefix='/api/v1/quiz')
    
    with app.app_context():
        db.create_all()
        from app.load_data import load_data
        load_data()
    
    return app