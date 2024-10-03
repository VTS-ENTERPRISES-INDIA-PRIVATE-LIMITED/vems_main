import { Table, Button, Input, Modal, Form } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewVehicle.css';
import AddVehicle from '../AddVehicle/AddVehicle';
import { useNavigate } from 'react-router-dom';

const ViewVehicle = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddVehicleModalVisible, setIsAddVehicleModalVisible] = useState(false);
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getIdnName`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  const fetchVehicleData = async () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/vehicle/getAllVehicles`)
      .then((result) => {
        setVehicles(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchVehicleData();
    fetchVendors();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value ? value.toLowerCase() : '');
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/vehicle/updateVehicleById/${editingVehicle.VehicleId}`, editingVehicle)
      .then((response) => {
        setVehicles(vehicles.map(v => v.VehicleId === editingVehicle.VehicleId ? editingVehicle : v));
        setIsModalVisible(false);
        console.log(response.data);
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
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/vehicle/deleteVehicleById/${vehicle.VehicleId}`)
          .then((response) => {
            setVehicles(vehicles.filter(v => v.VehicleId !== vehicle.VehicleId));
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
      (vehicle.VehicleName || '').toLowerCase().includes(searchText) ||
      (vehicle.VehicleNumber || '').toLowerCase().includes(searchText) ||
      (vendors.find(v => v.VendorId === vehicle.VendorId)?.VendorName || '').toLowerCase().includes(searchText)
    )
    .map((vehicle, index) => ({
      ...vehicle,
      sno: index + 1
    }));

  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', padding: '30px' }}>
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
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Vehicle Name</th>
            <th>Reg. No</th>
            <th>Vendor Name</th>
            <th>Actions</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle, index) => (
            <tr key={vehicle.sno}>
              <td>{index + 1}</td>
              <td>{vehicle.VehicleName}</td>
              <td>{vehicle.VehicleNumber}</td>
              <td>{vendors.find(v => v.VendorId === vehicle.VendorId)?.VendorName}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(vehicle)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(vehicle)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="view-more-button"
                  onClick={() =>
                    navigate(`/VehicleDashboard`, {
                      state: { vehicle },
                    })
                  }
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              value={editingVehicle?.VehicleName}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleName: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Vehicle No">
            <Input
              value={editingVehicle?.VehicleNumber}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleNumber: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Vendor Name">
            <Input
              value={editingVehicle?.VendorId}
              onChange={e => setEditingVehicle({ ...editingVehicle, VendorId: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Vehicle Type">
            <Input
              value={editingVehicle?.VehicleType}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleType: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Year of Manufacturing">
            <Input
              value={editingVehicle?.VehicleManufacturedYear}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleManufacturedYear: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Mileage">
            <Input
              value={editingVehicle?.VehicleMileageRange}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleMileageRange: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Insurance Number">
            <Input
              value={editingVehicle?.VehicleInsuranceNumber}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleInsuranceNumber: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Fuel Type">
            <Input
              value={editingVehicle?.VehicleFuelType}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleFuelType: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Seat Capacity">
            <Input
              value={editingVehicle?.VehicleSeatCapacity}
              onChange={e => setEditingVehicle({ ...editingVehicle, VehicleSeatCapacity: e.target.value })}
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
    </div>
  );
};

export default ViewVehicle;
