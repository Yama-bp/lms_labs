from structures.extension import ma
from app.models import Publisher

class PublisherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Publisher
        load_instance = True

publisher_schema = PublisherSchema()
publishers_schema = PublisherSchema(many=True)