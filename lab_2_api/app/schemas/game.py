from structures.extension import ma
from app.models import Game

class GameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Game
        load_instance = True  # для десериализации (создание/обновление)
        include_fk = False

game_schema = GameSchema()
games_schema = GameSchema(many=True)