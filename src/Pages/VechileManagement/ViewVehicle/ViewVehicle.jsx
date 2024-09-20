import { Table, Button, Input, Modal, Form, Upload } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewVehicle.css'; 
import AddVehicle from '../AddVehicle/AddVehicle';

const ViewVehicle = () => {
  const navigate = useNavigate(); 
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddVehicleModalVisible, setIsAddVehicleModalVisible] = useState(false); 

  useEffect(() => {
    axios.get("http://localhost:8081/vehicles")
      .then((result) => {
        setVehicles(result.data);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value ? value.toLowerCase() : '');
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/vehicles/${editingVehicle.vehicleId}`, editingVehicle)
      .then((response) => {
        setVehicles(vehicles.map(v => v.vehicleId === editingVehicle.vehicleId ? editingVehicle : v));
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (vehicle) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this vehicle?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete(`http://localhost:8081/vehicles/${vehicle.vehicleId}`)
          .then((response) => {
            setVehicles(vehicles.filter(v => v.vehicleId !== vehicle.vehicleId));
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel: () => {
        console.log('Cancel delete action');
      }
    });
  };

  const handleAddVehicle = () => {
    setIsAddVehicleModalVisible(true);
  };

  const filteredVehicles = vehicles
    .filter(vehicle =>
      (vehicle.vehicleName || '').toLowerCase().includes(searchText) ||
      (vehicle.vehicleNumber || '').toLowerCase().includes(searchText) ||
      (vehicle.vendorName || '').toLowerCase().includes(searchText)
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
      title: 'Vehicle Name',
      dataIndex: 'vehicleName',
      key: 'vehicleName',
    },
    {
      title: 'Reg. No',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" className="edit-button" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger className="delete-button" onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
    {
      title: 'View More',
      key: 'viewMore',
      render: (text, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => navigate(`/NewDashboard`, { state: { vehicle: record } })} />
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddVehicle}>
          Add Vehicle +
        </Button>
        <Input
          placeholder="Search Vehicles"
          prefix={<SearchOutlined />}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        dataSource={filteredVehicles}
        columns={columns}
        rowKey="sno"
        pagination={{ pageSize: 7 }}
        
      />
      
      <Modal
  title="Edit Vehicle"
  visible={isModalVisible}
  onOk={handleSave}
  onCancel={() => setIsModalVisible(false)}
  width={800}
  style={{ marginRight: '200px' }}
>
  <Form layout="vertical" className="two-column-form">
    <Form.Item label="Vehicle Name">
      <Input
        value={editingVehicle?.vehicleName}
        onChange={e => setEditingVehicle({ ...editingVehicle, vehicleName: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Vehicle No">
      <Input
        value={editingVehicle?.vehicleNumber}
        onChange={e => setEditingVehicle({ ...editingVehicle, vehicleNumber: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Vendor Name">
      <Input
        value={editingVehicle?.vendorName}
        onChange={e => setEditingVehicle({ ...editingVehicle, vendorName: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Vehicle Type">
      <Input
        value={editingVehicle?.vehicleType}
        onChange={e => setEditingVehicle({ ...editingVehicle, vehicleType: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Year of Manufacturing">
      <Input
        value={editingVehicle?.yearOfManufacturing}
        onChange={e => setEditingVehicle({ ...editingVehicle, yearOfManufacturing: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Mileage">
      <Input
        value={editingVehicle?.mileage}
        onChange={e => setEditingVehicle({ ...editingVehicle, mileage: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Insurance Number">
      <Input
        value={editingVehicle?.insuranceNumber}
        onChange={e => setEditingVehicle({ ...editingVehicle, insuranceNumber: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Fuel Type">
      <Input
        value={editingVehicle?.fuelType}
        onChange={e => setEditingVehicle({ ...editingVehicle, fuelType: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Seat Capacity">
      <Input
        value={editingVehicle?.seatCapacity}
        onChange={e => setEditingVehicle({ ...editingVehicle, seatCapacity: e.target.value })}
      />
    </Form.Item>
  </Form>
</Modal>

      <Modal
        visible={isAddVehicleModalVisible}
        onCancel={() => setIsAddVehicleModalVisible(false)}
        footer={null}
        width={800}
        style={{ marginRight: '200px' }}
      >
        <AddVehicle onClose={() => setIsAddVehicleModalVisible(false)} />
      </Modal>
    </>
  );
};

export default ViewVehicle;
