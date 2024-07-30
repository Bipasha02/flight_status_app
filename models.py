from app import db

class Flight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flightNumber = db.Column(db.String(50), unique=True, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'flightNumber': self.flightNumber,
            'status': self.status
        }
