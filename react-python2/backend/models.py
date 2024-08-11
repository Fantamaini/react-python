from app import db

class Event(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  titre = db.Column(db.String(100), nullable=False)
  date = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text, nullable=False)
  heure = db.Column(db.String(10), nullable=False)
  lieu = db.Column(db.String(200), nullable=True)


  def to_json(self):
    return {
      "id":self.id,
      "titre":self.titre,
      "date":self.date,
      "heure":self.heure,
      "lieu":self.lieu,
      "description":self.description,
      
    }

 