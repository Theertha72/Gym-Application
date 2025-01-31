import React from 'react';
import './Workouts.css';

function Workouts() {
  const workouts = [
    {
      title: 'LOOSE BELLY FAT',
      exercises: [
        { 
          name: 'CRUNCHES', 
          duration: '10 s',
          image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=500&auto=format'
        },
        { 
          name: 'SITUP', 
          duration: '30 s',
          image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=500&auto=format'
        },
        { 
          name: 'JUMPING JACKS', 
          duration: '30 s',
          image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=500&auto=format'
        },
        { 
          name: 'BURPEES', 
          duration: '40 s',
          image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&auto=format'
        }
      ]
    },
    {
      title: 'ARM WORKOUT',
      exercises: [
        { 
          name: 'PUSHUPS', 
          duration: '20 s',
          image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=500&auto=format'
        },
        { 
          name: 'TRICEP DIPS', 
          duration: '30 s',
          image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=500&auto=format'
        },
        { 
          name: 'ARM CIRCLES', 
          duration: '20 s',
          image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=500&auto=format'
        },
        { 
          name: 'DIAMOND PUSHUPS', 
          duration: '30 s',
          image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&auto=format'
        }
      ]
    }
  ];

  return (
    <div className="workouts-container">
      <div className="workout-card">
        <div className="workout-header">
          <h1>{workouts[0].title}</h1>
        </div>
        <div className="exercises-list">
          {workouts[0].exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <div className="exercise-icon">
                <img src={exercise.image} alt={exercise.name} className="workout-icon" />
              </div>
              <div className="exercise-details">
                <span className="exercise-name">{exercise.name}</span>
                <span className="exercise-duration">{exercise.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
