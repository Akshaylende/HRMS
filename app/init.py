from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# creating an instance of flask app here 
flask_app = Flask(__name__)

# setting up database connections
flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hrms.db'
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# creating an instance of sqlite db 
db = SQLAlchemy(flask_app)