import React, { useState } from 'react';
import './BMICalculator.css';

function BMICalculator() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: ''
  });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculateBMI = (e) => {
    e.preventDefault();
    setMessage('');
    setStatus('');

    // Convert height from cm to meters
    const heightInMeters = parseFloat(formData.height) / 100;
    const weightInKg = parseFloat(formData.weight);

    // Calculate BMI
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = bmiValue.toFixed(1);

    // Determine BMI Category
    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      bmiCategory = 'Normal Weight';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }

    // Set result
    setResult({
      name: formData.name,
      bmiValue: roundedBMI,
      bmiCategory: bmiCategory
    });
    setStatus('success');
    setMessage('BMI calculated successfully!');
  };

  return (
    <div className="bmi-container">
      <div className="bmi-calculator">
        <h2>BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Your Age"
              required
              min="1"
              max="120"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              required
              step="0.1"
              min="20"
              max="300"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              required
              step="0.1"
              min="50"
              max="300"
            />
          </div>

          <button type="submit">Calculate BMI</button>

          {message && <div className={`message ${status}`}>{message}</div>}

          {result && (
            <div className="result">
              <h3>Results</h3>
              <p>Name: {result.name}</p>
              <p>BMI: {result.bmiValue}</p>
              <p>Category: {result.bmiCategory}</p>
              <div className={`category ${result.bmiCategory.toLowerCase().replace(' ', '')}`}>
                {result.bmiCategory}
              </div>
              <div className="recommendations">
                <h4>Recommendations:</h4>
                {result.bmiCategory === 'Underweight' && <p>Consider increasing your caloric intake and strength training.</p>}
                {result.bmiCategory === 'Normal Weight' && <p>Great job! Maintain your healthy lifestyle.</p>}
                {result.bmiCategory === 'Overweight' && <p>Focus on balanced diet and regular exercise.</p>}
                {result.bmiCategory === 'Obese' && <p>Consult with a healthcare provider for a personalized plan.</p>}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BMICalculator;
