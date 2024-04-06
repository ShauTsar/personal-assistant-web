import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useTheme } from './ThemeContext';
import TransactionForm from './TransactionForm.tsx';
import TransactionList from './TransactionList.tsx';
import ExpenseChart from './ExpenseChart.tsx';
import '../styles/FinancialPage.css';
import { UserServiceClient } from '../../proto/gen/user_grpc_web_pb';
import { AddCategoryRequest, AddCategoryResponse, Category, GetCategoriesRequest, GetCategoriesResponse, GetFinancesRequest, GetFinancesResponse, AddFinanceRequest, AddFinanceResponse, Finances } from '../../proto/gen/user_pb.js';

function FinancialPage() {
    const TOKEN_KEY = 'sessionToken';
    const token = localStorage.getItem(TOKEN_KEY);
    const { darkMode } = useTheme();
    const [transactions, setTransactions] = useState<Finances.AsObject[]>([]);
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchTransactions();
    }, []);

    const fetchCategories = async () => {
        const client = new UserServiceClient('http://localhost:8081', null, null);
        const request = new GetCategoriesRequest;
        request.setToken(token);
        client.getCategories(request, null, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log('Response from server:', response.toObject());
            const categoriesFromServer = response.getCategoryList().map((categories) => categories.toObject());
            setCategories(categoriesFromServer);

        });
    };

    const fetchTransactions = async () => {
        const client = new UserServiceClient('http://localhost:8081', null, null);
        const request = new GetFinancesRequest();
        request.setToken(token);
        client.getFinances(request, null, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }

            const transactionsFromServer = response.getFinancesList().map((finance) => finance.toObject());
            setTransactions(transactionsFromServer);
        });
    };

    const addTransaction = (transaction: Finances.AsObject) => {
        const client = new UserServiceClient('http://localhost:8081', null, null);
        const request = new AddFinanceRequest();
        const financeData = new Finances();
        const categoryData = new Category();
        financeData.setToken(token);
        financeData.setDate(transaction.date);
        financeData.setDescription(transaction.description);
        financeData.setPrice(transaction.price);
        categoryData.setId(transaction.category.id);
        categoryData.setName(transaction.category.name);
        categoryData.setIsForAll(transaction.category.isForAll);
        financeData.setCategory(categoryData)
        financeData.setIsExpense(transaction.isExpense);
        request.setFinances(financeData);
        client.addFinance(request, null, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }

            if (response.getSuccess()) {
                setTransactions([...transactions, financeData.toObject()]);
            } else {
                console.error(response.getMessage());
            }
        });
    };

    const addCategory = async () => {
        const client = new UserServiceClient('http://localhost:8081', null, null);
        const request = new AddCategoryRequest();
        const category = new Category();
        category.setName(newCategoryName);
        category.setIsForAll(false);
        request.setCategory(category);
        request.setToken(token);

        client.addCategory(request, null, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }

            if (response.getSuccess()) {
                setCategories([...categories, category.toObject()]);
                setNewCategoryName('');
            } else {
                console.error(response.getMessage());
            }
        });
    };
    return (
        <div className={`financial-app ${darkMode ? 'light-mode' : 'dark-mode'}`}>
            <Header />
            <div className="financial-content">
                <h1 className="financial-heading">Финансовый учет</h1>
                <TransactionForm addTransaction={addTransaction} categories={categories} />
                <div className="new-category-form">
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Новая категория"
                    />
                    <button onClick={addCategory}>Добавить категорию</button>
                </div>
                <div className="financial-section">
                    <div className="financial-chart">
                        <ExpenseChart transactions={transactions} />
                    </div>
                    <div className="financial-transactions">
                        <h2>Последние транзакции</h2>
                        <TransactionList transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinancialPage;