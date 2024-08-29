import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import './ViewVehicle.css'; 

const vehicles = [
  { "sno": 1, "vehicleName": "Toyota Corolla", "registrationNumber": "ABC123", "vendorName": "Vendor A" },
  { "sno": 2, "vehicleName": "Honda Civic", "registrationNumber": "XYZ456", "vendorName": "Vendor A" },
  { "sno": 3, "vehicleName": "Ford Focus", "registrationNumber": "LMN789", "vendorName": "Vendor C" },
  { "sno": 4, "vehicleName": "Chevrolet Malibu", "registrationNumber": "JKL012", "vendorName": "Vendor D" },
  { "sno": 5, "vehicleName": "Nissan Altima", "registrationNumber": "MNO345", "vendorName": "Vendor E" },
  { "sno": 6, "vehicleName": "Hyundai Sonata", "registrationNumber": "PQR678", "vendorName": "Vendor F" },
  { "sno": 7, "vehicleName": "Kia Optima", "registrationNumber": "STU901", "vendorName": "Vendor G" },
  { "sno": 8, "vehicleName": "Mazda 3", "registrationNumber": "VWX234", "vendorName": "Vendor H" },
  { "sno": 9, "vehicleName": "Volkswagen Jetta", "registrationNumber": "YZA567", "vendorName": "Vendor I" },
  { "sno": 10, "vehicleName": "Subaru Legacy", "registrationNumber": "BCD890", "vendorName": "Vendor J" },
];

const ViewVehicle = ({ onEdit, onDelete }) => {
  const navigate = useNavigate(); 
  const [searchText, setSearchText] = useState({
    vehicleName: '',
    registrationNumber: '',
    vendorName: ''
  });

  const handleSearch = (value, key) => {
    setSearchText({
      ...searchText,
      [key]: value.toLowerCase()
    });
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleName.toLowerCase().includes(searchText.vehicleName) &&
    vehicle.registrationNumber.toLowerCase().includes(searchText.registrationNumber) &&
    vehicle.vendorName.toLowerCase().includes(searchText.vendorName)
  );

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: (
        <span>
          Vehicle Name
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value, 'vehicleName')}
            style={{ width: 100, marginLeft: 8 }}
          />
        </span>
      ),
      dataIndex: 'vehicleName',
      key: 'vehicleName',
    },
    {
      title: (
        <span>
          Reg. No
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value, 'registrationNumber')}
            style={{ width: 100, marginLeft: 8 }}
          />
        </span>
      ),
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
    },
    {
      title: (
        <span>
          Vendor Name
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value, 'vendorName')}
            style={{ width: 100, marginLeft: 8 }}
          />
        </span>
      ),
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => onDelete(record)}>Delete</Button>
        </span>
      ),
    },
    {
      title: 'View More',
      key: 'viewMore',
      render: (text, record) => (
        <Button type="link" onClick={() => navigate(`/NewDashboard`, { state: { vehicle: record } })}>
  View More
</Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={filteredVehicles}
      columns={columns}
      rowKey="sno"
      pagination={{ pageSize: 7 }}
      bordered 
    />
  );
};

export default ViewVehicle;
