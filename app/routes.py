from app.init import flask_app

@flask_app.route('/')
def home():
    return ('Backend Server Started !')
