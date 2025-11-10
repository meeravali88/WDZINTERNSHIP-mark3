import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chartSetup';

const BudgetVsActualChart = ({ budgets }) => {
    const topProjects = budgets.slice().sort((a, b) => b.amount - a.amount).slice(0, 5);
    const data = {
        labels: topProjects.map(b => b.projectName),
        datasets: [
            { label: 'Budget', data: topProjects.map(b => b.amount), backgroundColor: 'rgba(52, 152, 219, 0.7)', borderColor: '#3498db', borderWidth: 1 },
            { label: 'Actual', data: topProjects.map(b => b.spent || 0), backgroundColor: 'rgba(46, 204, 113, 0.7)', borderColor: '#2ecc71', borderWidth: 1 }
        ]
    };
    const options = { responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: value => '$' + value.toLocaleString() } } } };
    return <Bar data={data} options={options} />;
};
export default BudgetVsActualChart;