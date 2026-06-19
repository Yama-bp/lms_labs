from structures.extension import ma
from marshmallow import fields
from app.models.game import Game
from app.models.publisher import Publisher

class PublisherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Publisher
        load_instance = True

class GameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Game
        load_instance = True
    
    publishers = fields.Method('get_publishers')
    
    def get_publishers(self, obj):
        return [gp.publisher.name for gp in obj.game_publishers]

publisher_schema = PublisherSchema()
publishers_schema = PublisherSchema(many=True)
game_schema = GameSchema()
games_schema = GameSchema(many=True)