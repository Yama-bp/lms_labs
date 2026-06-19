from marshmallow import fields
from structures.extension import ma

class AggregateSchema(ma.Schema):
    name = fields.Str(required=True)
    avg_popularity = fields.Float(required=True)
    max_popularity = fields.Float(required=True)
    min_popularity = fields.Float(required=True)
    count = fields.Int(required=True)

class QuizTaskSchema(ma.Schema):
    id = fields.Int()
    task_type = fields.Str()
    title = fields.Str()
    question = fields.Str()
    answer = fields.Str()
    options = fields.Str()
    task_order = fields.Int()
    group_id = fields.Int()

aggregate_schema = AggregateSchema(many=True)
quiz_task_schema = QuizTaskSchema(many=True)
quiz_task_single = QuizTaskSchema()