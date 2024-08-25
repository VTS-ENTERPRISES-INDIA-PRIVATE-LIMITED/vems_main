import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './ViewVehicle.css'; 

const vehicles = [
  { "sno": 1, "vehicleName": "Toyota Corolla", "registrationNumber": "ABC123", "vendorName": "Vendor A", "actions": "edit delete", "more": "View More Details" },
  { "sno": 2, "vehicleName": "Honda Civic", "registrationNumber": "XYZ456", "vendorName": "Vendor A", "actions": "edit delete", "more": "View More Details" },
  { "sno": 3, "vehicleName": "Ford Focus", "registrationNumber": "LMN789", "vendorName": "Vendor C", "actions": "edit delete", "more": "View More Details" },
  { "sno": 4, "vehicleName": "Chevrolet Malibu", "registrationNumber": "JKL012", "vendorName": "Vendor D", "actions": "edit delete", "more": "View More Details" },
  { "sno": 5, "vehicleName": "Nissan Altima", "registrationNumber": "MNO345", "vendorName": "Vendor E", "actions": "edit delete", "more": "View More Details" },
  { "sno": 6, "vehicleName": "Hyundai Sonata", "registrationNumber": "PQR678", "vendorName": "Vendor F", "actions": "edit delete", "more": "View More Details" },
  { "sno": 7, "vehicleName": "Kia Optima", "registrationNumber": "STU901", "vendorName": "Vendor G", "actions": "edit delete", "more": "View More Details" },
  { "sno": 8, "vehicleName": "Mazda 3", "registrationNumber": "VWX234", "vendorName": "Vendor H", "actions": "edit delete", "more": "View More Details" },
  { "sno": 9, "vehicleName": "Volkswagen Jetta", "registrationNumber": "YZA567", "vendorName": "Vendor I", "actions": "edit delete", "more": "View More Details" },
  { "sno": 10, "vehicleName": "Subaru Legacy", "registrationNumber": "BCD890", "vendorName": "Vendor J", "actions": "edit delete", "more": "View More Details" },
  
];

const Viewvehicle = ({ onViewMore, onEdit, onDelete }) => {
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
            style={{ width: 150, marginLeft: 8 }}
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
            style={{ width: 200, marginLeft: 8 }}
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
            style={{ width: 150, marginLeft: 8 }}
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
        <Button type="link" onClick={() => onViewMore(record)}>View More</Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={filteredVehicles}
      columns={columns}
      rowKey="sno"
      pagination={{ pageSize: 7}}
      bordered 
    />
  );
};

export default Viewvehicle;
