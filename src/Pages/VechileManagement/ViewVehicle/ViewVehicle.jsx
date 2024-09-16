import { Table, Button, Input, Modal, Form, Upload } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewVehicle.css'; 

const ViewVehicle = () => {
  const navigate = useNavigate(); 
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState({
    vehicleName: '',
    vehicleNumber: '',
    vendorName: ''
  });
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8083/vehicles")
      .then((result) => {
        setVehicles(result.data);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (value, key) => {
    setSearchText({
      ...searchText,
      [key]: value ? value.toLowerCase() : ''
    });
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    axios.put(`https://silent-wave-76445.pktriot.net/vehicles/${editingVehicle.vehicleId}`, editingVehicle)
      .then((response) => {
        setVehicles(vehicles.map(v =>v.vehicleId===editingVehicle.vehicleId ?editingVehicle : v));
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (vehicle) => {
    axios.delete(`https://silent-wave-76445.pktriot.net/vehicles/${vehicle.vehicleId}`)
      .then((response) => {
        setVehicles(vehicles.filter(v => v.vehicleId!== vehicle.vehicleId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('https://silent-wave-76445.pktriot.net/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.url; 
      
     
      setEditingVehicle(prev => ({
        ...prev,
        vehicleImage: imageUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    
    return false; 
  };

  const filteredVehicles = vehicles
    .filter(vehicle =>
      (vehicle.vehicleName ||'').toLowerCase().includes(searchText.vehicleName) &&
      (vehicle.vehicleNumber ||'').toLowerCase().includes(searchText.vehicleNumber) &&
      (vehicle.vendorName ||'').toLowerCase().includes(searchText.vendorName)
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
            onChange={e => handleSearch(e.target.value, 'vehicleNumber')}
            style={{ width: 100, marginLeft: 8 }}
          />
        </span>
      ),
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
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
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Delete</Button>
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
    <>
      <Table
        dataSource={filteredVehicles}
        columns={columns}
        rowKey="sno"
        pagination={{ pageSize: 7 }}
        bordered 
      />
      
     
      <Modal
        title="Edit Vehicle"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
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
          <Form.Item label="Engine Number">
            <Input
              value={editingVehicle?.engineNumber}
              onChange={e => setEditingVehicle({ ...editingVehicle, engineNumber: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Chassis Number">
            <Input
              value={editingVehicle?.chassisNumber}
              onChange={e => setEditingVehicle({ ...editingVehicle, chassisNumber: e.target.value })}
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
          {/* <Form.Item label="Vehicle Image">
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Select Other Image</Button>
            </Upload>
            {editingVehicle?.vehicleImage && (
              <img
                src={`${editingVehicle.vehicleImage}?${new Date().getTime()}`} 
                alt="Vehicle"
                style={{ width: '30%', height: '20vh', marginTop: 8 }}
              />
            )}
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ViewVehicle;
