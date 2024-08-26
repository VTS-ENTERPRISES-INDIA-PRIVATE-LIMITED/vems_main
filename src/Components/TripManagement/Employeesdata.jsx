import React, { useState } from 'react';
import { Table, Input, Row, Col } from 'antd';
import './Employeesdata.css'; // Import your CSS file

// Sample data
const employees = [
  { sno: 1, id: 'E001', name: 'John Doe', mobile: '123-456-7890', email: 'john.doe@example.com', address: 'SRP Tools, Sholinganur, Chennai' },
  { sno: 2, id: 'E002', name: 'Jane Smith', mobile: '987-654-3210', email: 'jane.smith@example.com', address: 'SRP Tools, Sholinganur, Chennai' },
  { sno: 3, id: 'E003', name: 'Emily Johnson', mobile: '555-123-4567', email: 'emily.johnson@example.com', address: 'SRP Tools, Sholinganur, Chennai' },
  { sno: 4, id: 'E004', name: 'Michael Brown', mobile: '444-555-6666', email: 'michael.brown@example.com', address: 'Central Tidel Park, Chennai' },
  { sno: 5, id: 'E005', name: 'Sarah Wilson', mobile: '333-222-1111', email: 'sarah.wilson@example.com', address: 'Central Tidel Park, Chennai' },
  { sno: 6, id: 'E006', name: 'David Miller', mobile: '777-888-9999', email: 'david.miller@example.com', address: 'Some Other Address' },
  { sno: 7, id: 'E007', name: 'Laura Davis', mobile: '999-888-7777', email: 'laura.davis@example.com', address: 'Another Address' },
  { sno: 8, id: 'E008', name: 'James Wilson', mobile: '666-555-4444', email: 'james.wilson@example.com', address: 'Yet Another Address' },
  { sno: 9, id: 'E009', name: 'Emma Johnson', mobile: '555-444-3333', email: 'emma.johnson@example.com', address: 'Some Address' },
  { sno: 10, id: 'E010', name: 'Olivia Brown', mobile: '444-333-2222', email: 'olivia.brown@example.com', address: 'Different Address' },
];

const routeCodes = {
  'SRP Tools, Sholinganur, Chennai': 'ROUTE1',
  'Central Tidel Park, Chennai': 'ROUTE2',
  // Add more routes and codes as needed
};

const calculateCode = (address) => {
  return routeCodes[address] || 'No Code';
};

const EmployeeTable = () => {
  const [searchText, setSearchText] = useState({
    id: '',
    name: '',
    route: ''
  });

  const handleSearch = (value, key) => {
    setSearchText({
      ...searchText,
      [key]: value.toLowerCase()
    });
  };

  const filteredEmployees = employees.filter(employee =>
    employee.id.toLowerCase().includes(searchText.id) &&
    employee.name.toLowerCase().includes(searchText.name) &&
    calculateCode(employee.address).toLowerCase().includes(searchText.route)
  );

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Employee ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Employee Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Code',
      key: 'code',
      render: (text, record) => (
        <span>
          {calculateCode(record.address)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search by ID"
            onChange={e => handleSearch(e.target.value, 'id')}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Search by Name"
            onChange={e => handleSearch(e.target.value, 'name')}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Search by Route"
            onChange={e => handleSearch(e.target.value, 'route')}
          />
        </Col>
      </Row>
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="sno"
        bordered
      />
    </div>
  );
};

export default EmployeeTable;
