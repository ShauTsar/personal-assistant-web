import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import PasswordRecovery from './components/pages/PasswordRecovery';
import Registration from './components/pages/Registation';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
      <Router>
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
