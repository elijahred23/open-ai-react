import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import VisionApp from './VisionApp';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <nav className="navbar">
          <NavLink to="/vision" className="nav-link">
            Vision App
          </NavLink>
        </nav>

        <Routes>
          <Route path="/vision" element={<VisionApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
