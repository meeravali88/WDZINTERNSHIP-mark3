import React from 'react';


const KpiCard = ({ title, value, trend, trendDirection, cardType }) => {
    
    const getTrend = () => {
        if (!trend) {
            return <span>No data available</span>;
        }
        const isUp = trendDirection === 'up';
        return (
            <>
                <i className={`fas ${isUp ? 'fa-arrow-up' : 'fa-arrow-down'} ${isUp ? 'trend-up' : 'trend-down'}`}></i>
                <span>{trend}</span>
            </>
        );
    };

    const cardClass = cardType ? `kpi-card type-${cardType}` : 'kpi-card';

    return (
        <div className={cardClass}>
            <div className="kpi-value">{value}</div>
            <div className="kpi-title">{title}</div>
            <div className="kpi-trend">{getTrend()}</div>
        </div>
    );
};

export default KpiCard;