import React, { useState } from 'react';
import { Button, Select, Input, DatePicker, TimePicker, List } from 'antd';
import 'antd/dist/reset.css'; 
import './TripSchedule.css'; 

const { Option } = Select;

const VehicleForm = () => {
  const [source, setSource] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [driver, setDriver] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleAddEmployee = () => {
    if (employeeName) {
      setEmployees([...employees, employeeName]);
      setEmployeeName('');
    }
  };

  const handleSubmit = () => {
   
    console.log({ source, employees, destination, vehicle, driver, date, time });
  };

  return (
    <div className="form-container">
      <div className="form-item">
        <Input
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>

      <div className="form-item">
        <Button type="primary" onClick={handleAddEmployee}>
          Add Employee
        </Button>
      </div>

      {employees.length > 0 && (
        <div className="employee-list">
          <List
            size="small"
            header={<div>Employees Added</div>}
            bordered
            dataSource={employees}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      )}

      <div className="form-item">
        <Input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="form-item">
        <Select
          placeholder="Select Vehicle"
          value={vehicle}
          onChange={(value) => setVehicle(value)}
          style={{ width: '100%' }}
        >
          <Option value="vehicle1">Vehicle 1</Option>
          <Option value="vehicle2">Vehicle 2</Option>
         
        </Select>
      </div>

      <div className="form-item">
        <Select
          placeholder="Select Driver"
          value={driver}
          onChange={(value) => setDriver(value)}
          style={{ width: '100%' }}
        >
          <Option value="driver1">Driver 1</Option>
          <Option value="driver2">Driver 2</Option>
          
        </Select>
      </div>

      <div className="form-item">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Select Date"
          dateFormat="yyyy-MM-dd"
          className="datepicker"
        />
      </div>

      <div className="form-item">
        <TimePicker
          value={time}
          onChange={(time) => setTime(time)}
          format="HH:mm"
          placeholder="Select Time"
          className="timepicker"
        />
      </div>

      <div className="form-item">
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VehicleForm;
