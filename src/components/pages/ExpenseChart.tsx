import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/ExpenseChart.css';
import { Finances } from '../../proto/gen/user_pb.js';

Chart.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
    transactions: Finances.AsObject[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
    const categories = transactions.reduce((acc, transaction) => {
        const category = transaction.category.name;
        const amount = parseFloat(transaction.price);
        if (acc[category]) {
            acc[category] += amount;
        } else {
            acc[category] = amount;
        }
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: [
                    '#F44336',
                    '#E91E63',
                    '#9C27B0',
                    '#673AB7',
                    '#3F51B5',
                    '#2196F3',
                    '#03A9F4',
                    '#00BCD4',
                    '#009688',
                    '#4CAF50',
                    '#8BC34A',
                    '#CDDC39',
                    '#FFEB3B',
                    '#FFC107',
                    '#FF9800',
                    '#FF5722',
                ],
            },
        ],
    };

    return (
        <div className="expense-chart">
            <Doughnut data={data} />
        </div>
    );
};

export default ExpenseChart;