import React, { useEffect, useState } from "react";
import "../../../styles/AttendanceAdvanced.css";
import { Bar } from "react-chartjs-2";

function AttendanceModule({ attendance = [] }) {
  const [filterType, setFilterType] = useState("today");
  const [filtered, setFiltered] = useState([]);

  // Today date string
  const todayStr = new Date().toLocaleDateString();

  // FILTER LOGIC
  useEffect(() => {
    if (filterType === "today") {
      setFiltered(attendance.filter((a) => a.date === todayStr));
    } 
    else if (filterType === "month") {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      setFiltered(
        attendance.filter((a) => {
          const d = new Date(a.date);
          return d.getMonth() === month && d.getFullYear() === year;
        })
      );
    } 
    else {
      setFiltered(attendance);
    }
  }, [filterType, attendance, todayStr]);

  // MONTHLY CHART DATA
  const monthlyCount = attendance.reduce((acc, rec) => {
    const month = new Date(rec.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(monthlyCount),
    datasets: [
      {
        label: "Attendance Count",
        data: Object.values(monthlyCount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      }
    ]
  };

  let time;


  return (
    <div className="att-advanced-wrapper">

      {/* HEADER */}
      <h2 className="attendance-title">Employee Attendance</h2>

      {/* TOTAL PRESENT TODAY */}
      {/* <p className="attendance-count">
        Today Present: <strong>{attendance.filter(a => a.date === todayStr).length}</strong>
      </p> */}

      {/* FILTER BUTTONS */}
      <div className="att-filters">
        {/* <button 
          onClick={() => setFilterType("today")} 
          className={filterType === "today" ? "active" : ""}
        >
          Today
        </button> */}

        <button 
          onClick={() => setFilterType("month")} 
          className={filterType === "month" ? "active" : ""}
        >
          This Month
        </button>

        {/* <button 
          onClick={() => setFilterType("all")} 
          className={filterType === "all" ? "active" : ""}
        >
          All Records
        </button> */}
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="att-table-wrapper">
        <h3>Records ({filtered.length})</h3>

        <table className="att-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
             
             </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                {/* <td colSpan="5" style={{ textAlign: "center" }}>
                  No attendance marked yet.
                </td> */}
              </tr>
            ) : (
              filtered.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.name}</td>
                  <td>{rec.email}</td>
                  <td>{rec.date}</td>
                  {/* <td>{time = rec.timestamp.toString().slice(11, 16)}</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MONTHLY CHART */}
      <div className="att-chart-wrapper">
        <h3>Monthly Attendance Chart</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default AttendanceModule;
