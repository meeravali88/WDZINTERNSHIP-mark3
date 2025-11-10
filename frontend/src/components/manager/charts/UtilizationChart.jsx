import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chartSetup';

const UtilizationChart = ({ employees }) => {
    const departments = {};
    employees.forEach(e => { departments[e.department] = (departments[e.department] || 0) + 1; });
    const data = {
        labels: Object.keys(departments),
        datasets: [{
            label: 'Employees',
            data: Object.values(departments),
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: '#3498db',
            borderWidth: 1
        }]
    };
    const options = { responsive: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } };
    return <Bar data={data} options={options} />;
};
export default UtilizationChart;