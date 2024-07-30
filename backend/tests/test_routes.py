import unittest
from app import app, db
from models import Flight

class FlightStatusTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

        flight = Flight(flightNumber='AB123', status='On Time')
        db.session.add(flight)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_flight_status(self):
        response = self.app.get('/api/flight-status')
        self.assertEqual(response.status_code, 200)
        self.assertIn('AB123', response.get_data(as_text=True))

    def test_update_status(self):
        response = self.app.post('/api/update-status', json={'flightNumber': 'AB123', 'status': 'Delayed'})
        self.assertEqual(response.status_code, 204)

        flight = Flight.query.filter_by(flightNumber='AB123').first()
        self.assertEqual(flight.status, 'Delayed')

if __name__ == '__main__':
    unittest.main()
