from flask import Blueprint, jsonify
from app.models.publisher import Publisher
from app.schemas.game import publisher_schema, publishers_schema

publishers_bp = Blueprint('publishers', __name__)

@publishers_bp.route('/', methods=['GET'])
def get_publishers():
    publishers = Publisher.query.all()
    return jsonify({"success": True, "publishers": publishers_schema.dump(publishers)}), 200