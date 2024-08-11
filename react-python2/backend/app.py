from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
import os

app = Flask(__name__)

# Nous pouvons commenter cette configuration CORS pour la production car nous exécutons le frontend et le backend sur le même serveur
# CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///events.db" 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Fichiers statiques du serveur à partir du dossier « dist » sous le répertoire « frontend »
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)

# api routes
import routes

with app.app_context():
  db.create_all()

if __name__ == "__main__":
  app.run(debug=True)