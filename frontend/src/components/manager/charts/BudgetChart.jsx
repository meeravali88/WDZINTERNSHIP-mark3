import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './chartSetup'; // Register components

const BudgetChart = ({ budgets }) => {
    const categories = {};
    budgets.forEach(budget => {
        if (!categories[budget.category]) {
            categories[budget.category] = 0;
        }
        categories[budget.category] += budget.amount;
    });

    const data = {
        labels: Object.keys(categories),
        datasets: [{
            data: Object.values(categories),
            backgroundColor: ['rgba(52, 152, 219, 0.7)','rgba(46, 204, 113, 0.7)','rgba(155, 89, 182, 0.7)','rgba(241, 196, 15, 0.7)','rgba(230, 126, 34, 0.7)'],
            borderColor: ['#3498db','#2ecc71','#9b59b6','#f1c40f','#e67e22'],
            borderWidth: 1
        }]
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    };

    return <Doughnut data={data} options={options} />;
};

export default BudgetChart;