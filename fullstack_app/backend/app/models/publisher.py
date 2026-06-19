from structures.extension import db

class Publisher(db.Model):
    __tablename__ = 'publisher'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column('Издатель', db.String(100), nullable=False, unique=True)
    
    game_publishers = db.relationship('GamePublisher', back_populates='publisher', cascade='all, delete-orphan')
    
    def __init__(self, name):
        self.name = name
    
    def __repr__(self):
        return f'<Publisher {self.id}: {self.name}>'