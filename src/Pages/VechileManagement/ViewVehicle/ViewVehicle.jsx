import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewVehicle.css'; 

const ViewVehicle = ({ onEdit, onDelete }) => {
  const navigate = useNavigate(); 
  const [vehicles, setVehicle] = useState([]);
  const [searchText, setSearchText] = useState({
    vehicleName: '',
    registrationNumber: '',
    vendorName: ''
  });

  useEffect(() => {
    axios.get("https://silent-wave-76445.pktriot.net/vehicles")
      .then((result) => {
        setVehicle(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (value, key) => {
    setSearchText({
      ...searchText,
      [key]: value.toLowerCase()
    });
  };

  const filteredVehicles = vehicles
    .filter(vehicle =>
      vehicle.vehicleName.toLowerCase().includes(searchText.vehicleName) &&
      vehicle.registrationNumber.toLowerCase().includes(searchText.registrationNumber) &&
      vehicle.vendorName.toLowerCase().includes(searchText.vendorName)
    )
    .map((vehicle, index) => ({
      ...vehicle,
      sno: index + 1 
    }));

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
