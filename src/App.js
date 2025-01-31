import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Plans from './components/Plans';
import Workouts from './components/Workouts';
import BMICalculator from './components/BMICalculator';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/plans">Plans</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/bmi">BMI Calculator</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
