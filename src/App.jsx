import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MemeGenerator from './components/MemeGenerator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-web3-dark via-black to-web3-accent/90 text-white">
        <div className="fixed inset-0 bg-[url('/public/grid.svg')] opacity-20" />
        <div className="relative">
          <Navbar />
          <Routes>
            <Route path="/" element={<MemeGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;