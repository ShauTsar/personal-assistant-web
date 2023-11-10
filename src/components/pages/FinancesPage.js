import React, { useState } from 'react';
import '../styles/FinancesPage.css';
import Header from "./Header";

function FinancesPage() {
    const darkMode = true; // Устанавливаем темную тему
    const [transactions, setTransactions] = useState([]); // Список финансовых транзакций
    const [newTransaction, setNewTransaction] = useState({ description: '', amount: 0, date: new Date() }); // Новая транзакция
    const [budget, setBudget] = useState(0); // Лимит бюджета

    // Обработчик для добавления новой транзакции
    const handleAddTransaction = () => {
        // Проверка на валидность новой транзакции
        if (newTransaction.description.trim() === '' || newTransaction.amount <= 0) {
            return;
        }

        // Добавление новой транзакции в список
        setTransactions([...transactions, newTransaction]);
        // Обнуление полей для новой транзакции
        setNewTransaction({ description: '', amount: 0, date: new Date() });
    };

    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Header />
            <div className="main-content">
                <div className="finances-page dark">
                    <h1>Учет финансов</h1>
                    <div className="budget">
                        <p>Лимит бюджета:</p>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="add-transaction">
                        <h2>Добавить транзакцию</h2>
                        <input
                            type="text"
                            placeholder="Описание"
                            value={newTransaction.description}
                            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Сумма"
                            value={newTransaction.amount}
                            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
                        />
                        <input
                            type="date"
                            value={newTransaction.date.toISOString().split('T')[0]}
                            onChange={(e) => setNewTransaction({ ...newTransaction, date: new Date(e.target.value) })}
                        />
                        <button onClick={handleAddTransaction}>Добавить</button>
                    </div>
                    <div className="transaction-list">
                        <h2>Список транзакций</h2>
                        <ul>
                            {transactions.map((transaction, index) => (
                                <li key={index}>
                                    {transaction.description} - {transaction.amount} - {transaction.date.toISOString().split('T')[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FinancesPage;
