from structures.extension import db

class QuizType(db.Model):
    __tablename__ = 'quiz_type'
    
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column('Код типа', db.String(1), nullable=False, unique=True)
    name = db.Column('Название типа', db.String(100), nullable=False)
    
    def __init__(self, code, name):
        self.code = code
        self.name = name
    
    def __repr__(self):
        return f'<QuizType {self.code}: {self.name}>'