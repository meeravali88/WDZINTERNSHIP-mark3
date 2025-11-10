import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chartSetup'; // Register components

const ProgressChart = ({ projects }) => {
    const data = {
        labels: projects.map(p => p.name),
        datasets: [{
            label: 'Progress %',
            data: projects.map(p => p.progress),
            backgroundColor: projects.map(p => {
                if (p.progress >= 80) return 'rgba(46, 204, 113, 0.7)';
                if (p.progress >= 50) return 'rgba(241, 196, 15, 0.7)';
                return 'rgba(231, 76, 60, 0.7)';
            }),
            borderColor: projects.map(p => {
                if (p.progress >= 80) return '#2ecc71';
                if (p.progress >= 50) return '#f1c40f';
                return '#e74c3c';
            }),
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Project Progress' }
        },
        scales: {
            y: { beginAtZero: true, max: 100, ticks: { callback: value => value + '%' } }
        }
    };

    return <Bar data={data} options={options} />;
};

export default ProgressChart;