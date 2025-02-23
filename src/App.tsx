import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemCountSetupPage from './pages/ProblemCountSetupPage';
import ProblemCountGamePage from './pages/ProblemCountGamePage'; 
import ProblemCountResultPage from './pages/ProblemCountResultPage';
import RankingPage from './pages/RankingPage';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<ProblemCountSetupPage />} />
        <Route path="/game" element={<ProblemCountGamePage />} />
        <Route path="/result" element={<ProblemCountResultPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </Router>
  )
}

export default App
