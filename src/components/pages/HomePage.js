import React from 'react';
import Header from "./Header";

function HomePage() {
    const darkMode = true; // Устанавливаем темную тему

    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Header />
            <div className="main-content">
                <h1 className="text-center">Твой персональный помощник Nova</h1>
            </div>
        </div>

    );
}

export default HomePage;
