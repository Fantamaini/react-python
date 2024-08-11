from app import app, db
from flask import request, jsonify 
from models import Event

# avoir tous les evenements
@app.route("/api/events",methods=["GET"])
def get_events():
  events = Event.query.all() 
  result = [event.to_json() for event in events]
  return jsonify(result)

# Creer un evenement
@app.route("/api/events",methods=["POST"])
def create_event():
  try:
    data = request.json

    # Validations
    required_fields = ["titre","date","heure","lieu","description"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    titre = data.get("titre")
    date = data.get("date")
    heure = data.get("heure")
    description = data.get("description")
    lieu  = data.get("lieu")

    
  
    new_event = Event(titre=titre, date=date, heure=heure,lieu=lieu, description=description)

    db.session.add(new_event) 
    db.session.commit()

    return jsonify(new_event.to_json()), 201
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
# supprimer un evenement 
@app.route("/api/events/<int:id>",methods=["DELETE"])
def delete_event(id):
  try:
    event = Event.query.get(id)
    if event is None:
      return jsonify({"error":"Event not found"}), 404
    
    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg":"Event deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
  
# Update un evenement
@app.route("/api/events/<int:id>",methods=["PATCH"])
def update_event(id):
  try:
    event = Event.query.get(id)
    if event is None:
      return jsonify({"error":"Event not found"}), 404
    
    data = request.json

    event.titre = data.get("titre",event.titre)
    event.date = data.get("date",event.date)
    event.heure = data.get("heure",event.heure)
    event.lieu = data.get("lieu",event.lieu)
    event.description = data.get("description",event.description)
  

    db.session.commit()
    return jsonify(event.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500

