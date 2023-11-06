import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



const Root = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <React.StrictMode>
            <App darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </React.StrictMode>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(<Root />);
reportWebVitals();
