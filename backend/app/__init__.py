from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .models import Base 

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)

def create_app():
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../db/application_example.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from . import routes

    return app

