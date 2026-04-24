from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_httpauth import HTTPBasicAuth
from flask import jsonify


db = SQLAlchemy()
ma = Marshmallow()
auth = HTTPBasicAuth()


@auth.get_password
def get_password(username):
    """Проверка пароля для Basic Auth"""
    if username == 'student':
        return 'dvfu'
    return None

@auth.error_handler
def unauthorized():
    """Ответ при ошибке аутентификации"""
    return jsonify({'error': 'Unauthorized access'}), 401