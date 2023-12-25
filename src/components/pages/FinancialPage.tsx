// FinancialPage.tsx
import React from 'react';
import Header from './Header';
import {useTheme} from './ThemeContext'
import '../styles/FinancialPage.css';


function FinancialPage() {
    const { darkMode } = useTheme();
    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
        <div className="financial-app">
            <Header />
            <div className="financial-content">
                <h1 className="financial-heading">Финансовый учет</h1>
                <div className="financial-section">
                    <div className="financial-chart">
                        {/* Добавьте вашу библиотеку или код для диаграмм здесь */}
                        <p>Графики и диаграммы</p>
                    </div>
                    <div className="financial-transactions">
                        <h2>Последние транзакции</h2>
                        {/* Пример транзакций */}
                        <div className="transaction-item">
                            <span className="transaction-type income">Доход</span>
                            <span className="transaction-amount">+$50.00</span>
                            <span className="transaction-date">01.01.2023</span>
                        </div>
                        <div className="transaction-item">
                            <span className="transaction-type expense">Расход</span>
                            <span className="transaction-amount">-$30.00</span>
                            <span className="transaction-date">02.01.2023</span>
                        </div>
                        {/* Добавьте ваш код для отображения транзакций */}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default FinancialPage;
