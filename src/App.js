import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import PasswordRecovery from './components/pages/PasswordRecovery';
import Registration from './components/pages/Registation';
import CalendarPage from "./components/pages/Calendar.tsx";
import FinancesPage from "./components/pages/FinancesPage";
// import CalendarPage from "./components/pages/CalendarOld"
import FinancialPage from "./components/pages/FinancialPage.tsx"
import SettingsPage from "./components/pages/SettingsPage.tsx"
import { ThemeProvider } from './components/pages/ThemeContext';

function App() {
  return (
      <ThemeProvider>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/finances" element={<FinancialPage/>} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/calendar" element={<CalendarPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
          </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;
