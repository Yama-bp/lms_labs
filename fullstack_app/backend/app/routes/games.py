from flask import Blueprint, jsonify, request
from app.models.game import Game
from app.models.publisher import Publisher
from app.models.game_publisher import GamePublisher
from structures.extension import db
from app.schemas.game import game_schema, games_schema, publisher_schema, publishers_schema
import traceback

games_bp = Blueprint('games', __name__)

@games_bp.route('/', methods=['GET'])
def get_games():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    sort_by = request.args.get('sort_by', 'id')
    sort_dir = request.args.get('sort_dir', 'asc')
    search = request.args.get('search', '')
    
    query = Game.query
    
    if search:
        query = query.filter(Game.title.ilike(f'%{search}%'))
    
    if hasattr(Game, sort_by):
        col = getattr(Game, sort_by)
        query = query.order_by(col.desc() if sort_dir == 'desc' else col.asc())
    else:
        query = query.order_by(Game.id.asc())
    
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        "success": True,
        "games": games_schema.dump(pagination.items),
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    }), 200

@games_bp.route('/<int:id>', methods=['GET'])
def get_game(id):
    game = Game.query.get(id)
    if not game:
        return jsonify({"success": False, "error": "Game not found"}), 404
    return jsonify({"success": True, "game": game_schema.dump(game)}), 200

@games_bp.route('/', methods=['POST'])
def create_game():
    try:
        data = request.get_json()
        print("POST data:", data)
        
        game = Game(
            title=data['title'],
            release_year=data.get('release_year'),
            player_count=data.get('player_count'),
            count_type=data.get('count_type', ''),
            description=data.get('description', ''),
            image_url=data.get('image_url', '')
        )
        db.session.add(game)
        db.session.flush()
        
        publisher_names = data.get('publishers', [])
        print("Publishers:", publisher_names)
        
        for pub_name in publisher_names:
            if pub_name and pub_name.strip():
                publisher = Publisher.query.filter_by(name=pub_name.strip()).first()
                if not publisher:
                    publisher = Publisher(pub_name.strip())
                    db.session.add(publisher)
                    db.session.flush()
                gp = GamePublisher(game_id=game.id, publisher_id=publisher.id)
                db.session.add(gp)
        
        db.session.commit()
        return jsonify({"success": True, "game": game_schema.dump(game)}), 201
    except Exception as e:
        db.session.rollback()
        print("ERROR:", str(e))
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500

@games_bp.route('/<int:id>', methods=['PUT'])
def update_game(id):
    game = Game.query.get(id)
    if not game:
        return jsonify({"success": False, "error": "Game not found"}), 404
    try:
        data = request.get_json()
        for field in ['title', 'release_year', 'player_count', 'count_type', 'description', 'image_url']:
            if field in data:
                setattr(game, field, data[field])
        
        if 'publishers' in data:
            GamePublisher.query.filter_by(game_id=id).delete()
            for pub_name in data['publishers']:
                if pub_name and pub_name.strip():
                    publisher = Publisher.query.filter_by(name=pub_name.strip()).first()
                    if not publisher:
                        publisher = Publisher(pub_name.strip())
                        db.session.add(publisher)
                        db.session.flush()
                    gp = GamePublisher(game_id=game.id, publisher_id=publisher.id)
                    db.session.add(gp)
        
        db.session.commit()
        return jsonify({"success": True, "game": game_schema.dump(game)}), 200
    except Exception as e:
        db.session.rollback()
        print("ERROR:", str(e))
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500

@games_bp.route('/<int:id>', methods=['DELETE'])
def delete_game(id):
    game = Game.query.get(id)
    if not game:
        return jsonify({"success": False, "error": "Game not found"}), 404
    try:
        GamePublisher.query.filter_by(game_id=id).delete()
        db.session.delete(game)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        db.session.rollback()
        print("ERROR:", str(e))
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500