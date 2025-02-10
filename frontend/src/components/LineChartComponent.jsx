import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LineChartComponent = ({ hazardData }) => {
  if (!hazardData || hazardData.length === 0) return <p>No data available</p>;

  // Preprocessing: Group by created_at and count occurrences
  const processedData = Object.values(
    hazardData.reduce((acc, { created_at }) => {
      const date = created_at.split("T")[0]; // Extract date part
      acc[date] = acc[date] || { created_at: date, count: 0 };
      acc[date].count += 1;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width={650} height={550} className="mt-2">
      <LineChart data={processedData}    margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
