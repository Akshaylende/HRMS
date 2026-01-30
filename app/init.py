from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# creating an instance of flask app here 
flask_app = Flask(__name__)

# Enabling CORS for the frontend port
CORS(flask_app, resources={r"/api/*": {"origins": ['http://localhost:1234', 'https://hrms-frontend-p5em.onrender.com']}})

# setting up database connections
flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hrms.db'
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# creating an instance of sqlite db 
db = SQLAlchemy(flask_app)