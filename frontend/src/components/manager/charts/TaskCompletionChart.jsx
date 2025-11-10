import React from 'react';
import { Pie } from 'react-chartjs-2';
import './chartSetup';

const TaskCompletionChart = ({ tasks }) => {
    const statusCounts = {
        'Completed': tasks.filter(t => t.status === 'completed').length,
        'Pending': tasks.filter(t => t.status === 'pending').length,
    };
    // Add overdue logic if needed, based on your original script
     const data = {
        labels: Object.keys(statusCounts),
        datasets: [{
            data: Object.values(statusCounts),
            backgroundColor: ['rgba(46, 204, 113, 0.7)', 'rgba(241, 196, 15, 0.7)'],
            borderColor: ['#2ecc71', '#f1c40f'],
            borderWidth: 1
        }]
    };
    const options = { responsive: true, plugins: { legend: { position: 'bottom' } } };
    return <Pie data={data} options={options} />;
};
export default TaskCompletionChart;