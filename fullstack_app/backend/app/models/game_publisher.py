from structures.extension import db

class GamePublisher(db.Model):
    __tablename__ = 'game_publisher'
    
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    publisher_id = db.Column(db.Integer, db.ForeignKey('publisher.id'), nullable=False)
    
    game = db.relationship('Game', back_populates='game_publishers')
    publisher = db.relationship('Publisher', back_populates='game_publishers')
    
    def __init__(self, game_id, publisher_id):
        self.game_id = game_id
        self.publisher_id = publisher_id