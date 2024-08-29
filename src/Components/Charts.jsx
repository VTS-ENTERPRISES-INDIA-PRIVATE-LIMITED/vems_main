import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import './Charts.css';

const Charts = () => {
  const onTimeDeliveryData = [
    { name: "Vehicle", value: 60, color: "#4A90E2" },
    { name: "Employee", value: 80, color: "#F5A623" },
  ];

  const tripStatisticsData = [
    { name: "In a Trip", value: 2, color: "#7C4DFF" },
    { name: "Idle", value: 1, color: "#FFCA28" },
    { name: "Completed", value: 1, color: "#00C853" },
  ];

  const vendorDistributionData = [
    { name: "sk travels", value: 20, color: "#1E88E5" },
    { name: "New travels", value: 10, color: "#00C853" },
    { name: "ybm travels", value: 5, color: "#FF8A65" },
  ];

  const fleetMixData = [
    { name: "Hatchback", value: 2, imageUrl: "https://res.cloudinary.com/dlo7urgnj/image/upload/v1724675133/bmw_nligns.jpg" },
    { name: "Sedan", value: 1, imageUrl: "https://res.cloudinary.com/dlo7urgnj/image/upload/v1724675133/bmw_nligns.jpg" },
    { name: "SUV", value: 1, imageUrl: "https://res.cloudinary.com/dlo7urgnj/image/upload/v1724675133/bmw_nligns.jpg" },
  ];

  <Tooltip
  formatter={(value, name) => `${name}: ${value}%`} 
  contentStyle={{ backgroundColor: "blue", borderRadius: "5px" }}  
/>

  

  return (
    <div className="charts">
     <div className="card">
  <h3>ON TIME DELIVERY</h3>
  <div className="pie-charts-container">
    {/* First Pie Chart for Vehicle */}
    <div className="pie-chart">
      <h4>Vehicle</h4>
      <PieChart width={150} height={150}>
        <Pie
          data={onTimeDeliveryData.filter(entry => entry.name === "Vehicle")}
          cx={75}
          cy={75}
          innerRadius={30}
          outerRadius={60}
          fill="#8884d8"
        //   paddingAngle={5}
          dataKey="value"
        >
          {onTimeDeliveryData.filter(entry => entry.name === "Vehicle").map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="legend">
        {onTimeDeliveryData.filter(entry => entry.name === "Vehicle").map((entry, index) => (
          <div key={index}>
            <span>{entry.name}</span>
            <span>{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>

    <div className="pie-chart">
      <h4>Employee</h4>
      <PieChart width={150} height={150}>
        <Pie
          data={onTimeDeliveryData.filter(entry => entry.name === "Employee")}
          cx={75}
          cy={75}
          innerRadius={30}
          outerRadius={60}
          fill="#F5A623"
        //   paddingAngle={}
          dataKey="value"
        >
          {onTimeDeliveryData.filter(entry => entry.name === "Employee").map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="legend">
        {onTimeDeliveryData.filter(entry => entry.name === "Employee").map((entry, index) => (
          <div key={index}>
            <span>{entry.name}</span>
            <span>{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


<div className="tripcard">
  <h3>TRIP STATISTICS</h3>
  <div className="chart-container">
    <PieChart width={150} height={150}>
      <Pie
        data={tripStatisticsData}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {tripStatisticsData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip /> 
    </PieChart>
  </div>
  <div className="legend">
    {tripStatisticsData.map((entry, index) => (
      <div key={index}>
        <span>{entry.name}</span>
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
</div>


      <div className="card">
  <h3>VENDOR DISTRIBUTION</h3>
  <BarChart
    width={280}
    height={250} 
    data={vendorDistributionData}
    layout="vertical"  
    margin={{ left:10 }} 
  >
    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    <XAxis type="number" />
    <YAxis dataKey="name" type="category" />
    <Tooltip />
    {/* <Legend /> */}
    <Bar dataKey="value" barSize={20}> 
      {vendorDistributionData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Bar>
  </BarChart>
</div>



<div className="card">
  <h3>FLEET MIX</h3>
  <ul>
    {fleetMixData.map((entry, index) => (
      <li key={index}>
        <span>
          <img src={entry.imageUrl} alt={entry.name} className="car-image" />
          {entry.name}
        </span>
        <span>{entry.value}</span>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
};

export default Charts;
