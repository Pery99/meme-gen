import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MemeGenerator from './components/MemeGenerator';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Meme Generator - Create and Share Memes</title>
        <meta name="description" content="Create, customize, and share memes easily with our free online meme generator" />
        <meta name="keywords" content="meme generator, meme maker, create memes, custom memes" />
        <meta property="og:title" content="Meme Generator" />
        <meta property="og:description" content="Create and share custom memes instantly" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-web3-dark via-black to-web3-accent/90 text-white">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="fixed inset-0 bg-[url('/public/grid.svg')] opacity-20" />
            <div className="relative">
              <Navbar />
              <Routes>
                <Route path="/" element={<MemeGenerator />} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;