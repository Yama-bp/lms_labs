from structures.extension import db

class Publisher(db.Model):
    __tablename__ = 'publisher'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column('Издатель', db.String(100), nullable=False)

    game_publishers = db.relationship("GamePublisher", cascade='all, delete')
    
    def __init__(self, name):
        self.name = name
    
    def __repr__(self):
        return f"<Publisher {self.id}: {self.name}>"


class Game(db.Model):
    __tablename__ = 'game'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column('Название', db.String(200), nullable=False)
    release_date = db.Column('Дата выхода', db.String(50))
    as_of_date = db.Column('Дата статистики', db.String(50))
    player_count = db.Column('Количество игроков', db.Integer)
    player_count_type = db.Column('Тип подсчета', db.String(50))
    notes = db.Column('Примечания', db.Text)

    game_publishers = db.relationship("GamePublisher", cascade='all, delete')
    
    def __init__(self, title, release_date, as_of_date, player_count, player_count_type, notes=""):
        self.title = title
        self.release_date = release_date
        self.as_of_date = as_of_date
        self.player_count = player_count
        self.player_count_type = player_count_type
        self.notes = notes
    
    def __repr__(self):
        return f"<Game {self.id}: {self.title} ({self.player_count}M {self.player_count_type})>"


class GamePublisher(db.Model):

    __tablename__ = 'game_publisher'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    publisher_id = db.Column(db.Integer, db.ForeignKey('publisher.id'))
    

    game = db.relationship("Game", back_populates="game_publishers")
    publisher = db.relationship("Publisher", back_populates="game_publishers")
    
    def __init__(self, game_id, publisher_id):
        self.game_id = game_id
        self.publisher_id = publisher_id