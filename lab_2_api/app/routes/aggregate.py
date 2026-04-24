from flask import Blueprint, jsonify
from app.utils.aggregate_queries import (
    get_all_games_with_details,
    get_stat_by_publisher,
    get_stat_by_type,
    get_stat_by_year
)
from app.schemas.aggregate import game_list_schema, stat_schema

aggregate_bp = Blueprint('aggregate', __name__)

# выборка данных в виде вложенного JSON
@aggregate_bp.route('/games/', methods=['GET'])
def all_games():
    """Получить список всех игр с деталями (вложенный JSON)"""
    results = get_all_games_with_details()
    return jsonify({
        "success": True,
        "games": game_list_schema.dump(results)
    }), 200


# статистика по издателям (макс, мин, среднее)
@aggregate_bp.route('/by-publisher/', methods=['GET'])
def stat_by_publisher():
    """Получить статистику по издателям: средняя, максимальная, минимальная популярность"""
    results = get_stat_by_publisher()
    return jsonify({
        "success": True,
        "stat": stat_schema.dump(results)
    }), 200


# статистика по типу подсчета (макс, мин, среднее)
@aggregate_bp.route('/by-type/', methods=['GET'])
def stat_by_type():
    """Получить статистику по типу подсчета: средняя, максимальная, минимальная популярность"""
    results = get_stat_by_type()
    return jsonify({
        "success": True,
        "stat": stat_schema.dump(results)
    }), 200


# статистика по годам (макс, мин, среднее)
@aggregate_bp.route('/by-year/', methods=['GET'])
def stat_by_year():
    """Получить статистику по годам выпуска: средняя, максимальная, минимальная популярность"""
    results = get_stat_by_year()
    return jsonify({
        "success": True,
        "stat": stat_schema.dump(results)
    }), 200