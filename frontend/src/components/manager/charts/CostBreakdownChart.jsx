import React from "react";
import { Pie } from "react-chartjs-2";
import "./chartSetup";

const CostBreakdownChart = ({ projects }) => {

  const materialCost = projects.reduce((sum, p) => sum + (p.materialCost || 0), 0);
  const labourCost = projects.reduce((sum, p) => sum + (p.labourCost || 0), 0);

  const data = {
    labels: ["Material Cost", "Labour Cost"],
    datasets: [
      {
        data: [materialCost, labourCost],
        backgroundColor: [
          "rgba(52, 152, 219, 0.7)",
          "rgba(46, 204, 113, 0.7)"
        ],
        borderColor: ["#3498db", "#2ecc71"],
        borderWidth: 1
      },
    ],
  };

  return <Pie data={data} />;
};

export default CostBreakdownChart;
