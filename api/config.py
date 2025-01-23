import os

class Config:
  SQLALCHEMY_DATABASE_URI='postgresql://user:password@127.0.0.1:5432/smarthint'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  UPLOAD_FOLDER = 'uploads/'
  SECRET_KEY = os.urandom(24)