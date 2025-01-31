import React from 'react';
import './Plans.css';

function Plans() {
  const plans = [
    {
      title: 'Basic Plan',
      price: '$29',
      duration: 'per month',
      features: [
        'Access to Gym Equipment',
        'Basic Workout Plans',
        'Locker Access',
        '24/7 Gym Access'
      ]
    },
    {
      title: 'Premium Plan',
      price: '$49',
      duration: 'per month',
      features: [
        'All Basic Features',
        'Personal Trainer',
        'Nutrition Guidance',
        'Fitness Classes'
      ]
    },
    {
      title: 'Pro Plan',
      price: '$79',
      duration: 'per month',
      features: [
        'All Premium Features',
        'Private Training Sessions',
        'Massage Therapy',
        'Spa Access'
      ]
    }
  ];

  return (
    <div className="plans-container">
      <h1 className="plans-title">Membership Plans</h1>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h2 className="plan-title">{plan.title}</h2>
            <div className="price">
              <span className="amount">{plan.price}</span>
              <span className="duration">{plan.duration}</span>
            </div>
            <ul className="features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
