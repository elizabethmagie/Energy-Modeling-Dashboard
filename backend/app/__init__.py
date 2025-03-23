from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .models import Base 

db = SQLAlchemy(model_class=Base)

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../db/application_example.db'

    db.init_app(app)

    # Create tables in the database (if they don't exist already)
    with app.app_context():
        Base.metadata.create_all(db.engine)

    # Import and register the routes
    from .routes import get_projects
    app.add_url_rule('/api/projects', view_func=get_projects, methods=['GET'])

    return app

