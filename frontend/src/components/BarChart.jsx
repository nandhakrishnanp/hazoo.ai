import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HazardBarChart = ({ hazardData }) => {
  // Process data to count occurrences of each hazard type
  const hazardCounts = hazardData.reduce((acc, item) => {
    acc[item.hazard_type] = (acc[item.hazard_type] || 0) + 1;
    return acc;
  }, {});

  // Convert object to array format suitable for Recharts
  const chartData = Object.keys(hazardCounts).map((key) => ({
    name: key,
    count: hazardCounts[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HazardBarChart;
