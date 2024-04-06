import React from 'react';
import '../styles/TransactionList.css';
import { Finances } from '../../proto/gen/user_pb.js';

interface TransactionListProps {
    transactions: Finances.AsObject[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    return (
        <div className="transaction-list">
            {transactions.map((transaction, index) => (
                <div
                    key={index}
                    className={`transaction-item ${transaction.isExpense ? 'expense' : 'income'}`}
                >
                    <span className="transaction-type">
                        {transaction.isExpense ? 'Расход' : 'Доход'}
                    </span>
                    <span className="transaction-description">{transaction.description}</span>
                    <span className="transaction-amount">
                        {transaction.price}
                    </span>
                    <span className="transaction-date">{transaction.date}</span>
                    <span className="transaction-category">{transaction.category.name}</span>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;