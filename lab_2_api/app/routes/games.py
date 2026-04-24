from flask import Blueprint, jsonify, request
from app.models import Game, GamePublisher
from structures.extension import db, auth
from app.schemas.game import game_schema, games_schema
from marshmallow import ValidationError

games_bp = Blueprint('games', __name__)

# GET /api/v1/games - получить список всех игр
@games_bp.route('/', methods=['GET'])
def get_games():
    """Получить все игры"""
    games = Game.query.all()
    return jsonify({
        "success": True,
        "games": games_schema.dump(games)
    }), 200


# GET /api/v1/games/<id> - получить игру по id
@games_bp.route('/<int:id>', methods=['GET'])
def get_game(id):
    """Получить игру по ID"""
    game = Game.query.get(id)
    if not game:
        return jsonify({"success": False, "error": "Game not found"}), 404
    return jsonify({
        "success": True,
        "game": game_schema.dump(game)
    }), 200


# POST /api/v1/games - создать новую игру (требует аутентификации)
@games_bp.route('/', methods=['POST'])
@auth.login_required
def create_game():
    try:
        data = request.get_json()
        
        # Проверяем обязательные поля
        required_fields = ['title', 'release_date', 'as_of_date', 'player_count', 'player_count_type']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "success": False, 
                    "error": f"Missing required field: {field}"
                }), 400
        
        # Создаем игру напрямую
        game = Game(
            title=data['title'],
            release_date=data['release_date'],
            as_of_date=data['as_of_date'],
            player_count=data['player_count'],
            player_count_type=data['player_count_type'],
            notes=data.get('notes', '')
        )
        db.session.add(game)
        db.session.flush()
        
        # Добавляем связи с издателями (если переданы)
        publisher_ids = data.get('publisher_ids', [])
        for pub_id in publisher_ids:
            gp = GamePublisher(game_id=game.id, publisher_id=pub_id)
            db.session.add(gp)
        
        db.session.commit()
        
        # Сериализуем результат
        return jsonify({
            "success": True,
            "game": game_schema.dump(game)
        }), 201
        
    except ValidationError as err:
        db.session.rollback()
        return jsonify({"success": False, "errors": err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500


# PUT /api/v1/games/<id> - обновить игру
@games_bp.route('/<int:id>', methods=['PUT'])
@auth.login_required
def update_game(id):
    """Обновить игру (требует аутентификации)"""
    game = Game.query.get(id)
    if not game:
        return jsonify({"success": False, "error": "Game not found"}), 404
    
    try:
        data = request.get_json()
        
        if 'title' in data:
            game.title = data['title']
        if 'release_date' in data:
            game.release_date = data['release_date']
        if 'as_of_date' in data:
            game.as_of_date = data['as_of_date']
        if 'player_count' in data:
            game.player_count = data['player_count']
        if 'player_count_type' in data:
            game.player_count_type = data['player_count_type']
        if 'notes' in data:
            game.notes = data['notes']
        
        db.session.commit()
        return jsonify({
            "success": True,
            "game": game_schema.dump(game)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500


# DELETE /api/v1/games/<id> - удалить игру
@games_bp.route('/<int:id>', methods=['DELETE'])
@auth.login_required
def delete_game(id):
    """Удалить игру (требует аутентификации)"""
    game = Game.query.get(id)
    if not game:
        return jsonify({"success": False, "error": "Game not found"}), 404
    
    try:
        db.session.delete(game)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500