from marshmallow import fields
from structures.extension import ma

# Схема для статистических данных (макс, мин, среднее)
class StatSchema(ma.Schema):
    name = fields.Str(required=True)
    avg_popularity = fields.Float(required=True)  # среднее
    max_popularity = fields.Float(required=True)  # максимальное
    min_popularity = fields.Float(required=True)  # минимальное
    count = fields.Int(required=False)            # количество

# Схема для списка игр (вложенный JSON)
class GameListSchema(ma.Schema):
    id = fields.Int(required=True)
    title = fields.Str(required=True)
    popularity = fields.Float(required=True)
    year = fields.Str(required=False)

stat_schema = StatSchema(many=True)
game_list_schema = GameListSchema(many=True)