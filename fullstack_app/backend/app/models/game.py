from structures.extension import db

class Game(db.Model):
    __tablename__ = 'game'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column('Название', db.String(200), nullable=False)
    release_year = db.Column('Год выхода', db.Integer)
    player_count = db.Column('Количество игроков', db.Float)
    count_type = db.Column('Тип подсчёта', db.String(50))
    description = db.Column('Описание', db.Text, default='')
    image_url = db.Column('Изображение', db.String(500), default='')
    
    game_publishers = db.relationship('GamePublisher', back_populates='game', cascade='all, delete-orphan')
    
    def __init__(self, title, release_year, player_count, count_type, description='', image_url=''):
        self.title = title
        self.release_year = release_year
        self.player_count = player_count
        self.count_type = count_type
        self.description = description
        self.image_url = image_url
    
    def __repr__(self):
        return f'<Game {self.id}: {self.title}>'