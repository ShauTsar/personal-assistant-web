import React, { useState } from 'react';
import '../styles/TransactionForm.css';
import { Category, Finances } from '../../proto/gen/user_pb.js';

interface TransactionFormProps {
    addTransaction: (transaction: Finances.AsObject) => void;
    categories: Category.AsObject[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, categories }) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState<Category.AsObject | null>(null);
    const [isExpense, setIsExpense] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (category) {
            const transaction: Finances.AsObject = {
                date,
                description,
                price: (isExpense ? -Math.abs(amount) : Math.abs(amount)).toString(),
                category: category,
                isExpense,
            };
            addTransaction(transaction);
            setDate('');
            setDescription('');
            setAmount(0);
            setCategory(null);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-group">
                <label htmlFor="date">Дата</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Сумма</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Категория</label>
                <select
                    id="category"
                    value={category ? category.name : ''}
                    onChange={(e) => {
                        const selectedCategory = categories.find((cat) => cat.name === e.target.value);
                        setCategory(selectedCategory || null);
                    }}
                    required
                >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Тип транзакции</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="expense"
                            checked={isExpense}
                            onChange={() => setIsExpense(true)}
                        />
                        Расход
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="income"
                            checked={!isExpense}
                            onChange={() => setIsExpense(false)}
                        />
                        Доход
                    </label>
                </div>
            </div>
            <button type="submit" className="submit-btn">
                Добавить транзакцию
            </button>
        </form>
    );
};

export default TransactionForm;