from flask import Blueprint, jsonify
from app.utils.aggregate_queries import get_stat_by_publisher, get_stat_by_year, get_stat_by_type

aggregate_bp = Blueprint('aggregate', __name__)

@aggregate_bp.route('/by-publisher', methods=['GET'])
def stat_by_publisher():
    return jsonify({"success": True, "data": get_stat_by_publisher()}), 200

@aggregate_bp.route('/by-year', methods=['GET'])
def stat_by_year():
    return jsonify({"success": True, "data": get_stat_by_year()}), 200

@aggregate_bp.route('/by-type', methods=['GET'])
def stat_by_type():
    return jsonify({"success": True, "data": get_stat_by_type()}), 200