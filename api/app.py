import os
from flask import Flask
from database.db import db
from config import Config
from flask_migrate import Migrate
from flask_cors import CORS
from controllers.products_controller import product_blueprint

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/products/*": {"origins": "http://localhost:5173"}})
os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

db.init_app(app)

migrate = Migrate(app,db)

app.register_blueprint(product_blueprint)

if __name__ == '__main__':
  while app.app_context():
    db.create_all()
  app.run(port=5000)