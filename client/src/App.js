import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import Dashboard from './pages/dashboard/Index';
import Auth from './pages/auth/Index';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
