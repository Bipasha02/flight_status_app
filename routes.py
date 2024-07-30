from flask import request, jsonify
from app import app, db, socketio
from models import Flight

@app.route('/api/flight-status', methods=['GET'])
def get_flight_status():
    flights = Flight.query.all()
    return jsonify([flight.to_dict() for flight in flights])

@app.route('/api/update-status', methods=['POST'])
def update_status():
    data = request.json
    flight = Flight.query.filter_by(flightNumber=data['flightNumber']).first()
    if flight:
        flight.status = data['status']
        db.session.commit()
        socketio.emit('status_update', {'flightNumber': flight.flightNumber, 'status': flight.status})
    return '', 204
