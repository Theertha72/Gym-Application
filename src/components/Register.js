import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Basic Plan'
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus('');

    try {
      const response = await fetch('http://localhost:5001/api/users/new-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Registration successful!');
        
        // Open WhatsApp using URL from backend
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, '_blank');
        }

        // Reset form
        setFormData({
          name: '',
          email: '',
          plan: 'Basic Plan'
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>REGISTER NOW</h1>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              required
            />
          </div>
          <div className="input-group">
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
            >
              <option value="Basic Plan">Basic Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Pro Plan">Pro Plan</option>
            </select>
          </div>
          <button type="submit" className="whatsapp-button">
            Register via WhatsApp
          </button>

          {message && (
            <div className={`message ${status === 'success' ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
