class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///games.db"
    
class DevelopmentConfig(Config):
    DEBUG = True