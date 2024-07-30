import React, { useState } from 'react';
import axios from 'axios';

const NotificationSettings = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    app: false
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setPreferences({
        ...preferences,
        [name]: checked
      });
    } else {
      if (name === 'email') setEmail(value);
      if (name === 'phoneNumber') setPhoneNumber(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const notificationSettings = {
      email,
      phoneNumber,
      preferences
    };
    await axios.post('/api/notifications', notificationSettings);
    alert('Notification settings saved successfully!');
  };

  return (
    <div>
      <h1>Notification Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={preferences.email}
              onChange={handleInputChange}
            />
            Receive notifications via Email
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sms"
              checked={preferences.sms}
              onChange={handleInputChange}
            />
            Receive notifications via SMS
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="app"
              checked={preferences.app}
              onChange={handleInputChange}
            />
            Receive notifications via App
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default NotificationSettings;
