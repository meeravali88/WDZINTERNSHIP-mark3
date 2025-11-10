import React from 'react';
import { Line } from 'react-chartjs-2';
import './chartSetup';

const PerformanceChart = ({ projects }) => {
    const data = {
        labels: projects.map(p => p.name),
        datasets: [{
            label: 'Progress %',
            data: projects.map(p => p.progress),
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: true
        }]
    };
    const options = { responsive: true, scales: { y: { beginAtZero: true, max: 100, ticks: { callback: value => value + '%' } } } };
    return <Line data={data} options={options} />;
};
export default PerformanceChart;