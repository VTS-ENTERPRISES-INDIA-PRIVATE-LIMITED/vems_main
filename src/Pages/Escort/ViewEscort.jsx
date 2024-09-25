import { Table, Button, Input, Modal, Form, Upload } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewEscort.css'; 
import EscortRegister from '../Escort/EscortRegister'
const ViewEscort = () => {
  const navigate = useNavigate(); 
  const [escorts, setescorts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingEscort, setEditingEscort] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddEscortModalVisible, setIsAddEscortModalVisible] = useState(false); 

  useEffect(() => {
    axios.get("http://localhost:8081/escorts")
      .then((result) => {
        setescorts(result.data);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value ? value.toLowerCase() : '');
  };

  const handleEdit = (Escort) => {
    setEditingEscort(Escort);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/escorts/${editingEscort.EscortId}`, editingEscort)
      .then((response) => {
        setescorts(escorts.map(v => v.EscortId === editingEscort.EscortId ? editingEscort : v));
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (Escort) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Escort?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete(`http://localhost:8081/escorts/${Escort.EscortId}`)
          .then((response) => {
            setescorts(escorts.filter(v => v.EscortId !== Escort.EscortId));
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

  const handleAddEscort = () => {
    setIsAddEscortModalVisible(true);
  };

  const filteredescorts = escorts
    .filter(Escort =>
      (Escort.EscortName || '').toLowerCase().includes(searchText) ||
      (Escort.EscortNumber || '').toLowerCase().includes(searchText) ||
      (Escort.VendorName || '').toLowerCase().includes(searchText)
    )
    .map((Escort, index) => ({
      ...Escort,
      sno: index + 1 
    }));

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Escort Name',
      dataIndex: 'EscortName',
      key: 'EscortName',
    },
    {
      title: 'profile',
      dataIndex: 'EscortProfilePicUpload ',
      key: 'EscortProfilePicUpload',
    },
    {
      title: 'Contact Number',
      dataIndex: 'ContactNumber',
      key: 'ContactNumber',
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
        <Button type="link" icon={<EyeOutlined />} onClick={() => navigate(`/EscortDashboard`, { state: { Escort: record } })} />
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddEscort}>
          Add Escort +
        </Button>
        <Input
          placeholder="Search escorts"
          prefix={<SearchOutlined />}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        dataSource={filteredescorts}
        columns={columns}
        rowKey="sno"
        pagination={{ pageSize: 7 }}
        
      />
      
      <Modal
  title="Edit Escort"
  visible={isModalVisible}
  onOk={handleSave}
  onCancel={() => setIsModalVisible(false)}
  width={800}
  style={{ marginRight: '200px' }}
>
  <Form layout="vertical" className="two-column-form">
    <Form.Item label="Escort Name">
      <Input
        value={editingEscort?.EscortName}
        onChange={e => setEditingEscort({ ...editingEscort, EscortName: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Escort No">
      <Input
        value={editingEscort?.EscortNumber}
        onChange={e => setEditingEscort({ ...editingEscort, EscortNumber: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Vendor Name">
      <Input
        value={editingEscort?.VendorName}
        onChange={e => setEditingEscort({ ...editingEscort, VendorName: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Escort Type">
      <Input
        value={editingEscort?.EscortType}
        onChange={e => setEditingEscort({ ...editingEscort, EscortType: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Year of Manufacturing">
      <Input
        value={editingEscort?.YearOfManufacturing}
        onChange={e => setEditingEscort({ ...editingEscort, YearOfManufacturing: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Mileage">
      <Input
        value={editingEscort?.Mileage}
        onChange={e => setEditingEscort({ ...editingEscort, Mileage: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Insurance Number">
      <Input
        value={editingEscort?.InsuranceNumber}
        onChange={e => setEditingEscort({ ...editingEscort, InsuranceNumber: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Fuel Type">
      <Input
        value={editingEscort?.FuelType}
        onChange={e => setEditingEscort({ ...editingEscort, FuelType: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Seat Capacity">
      <Input
        value={editingEscort?.SeatCapacity}
        onChange={e => setEditingEscort({ ...editingEscort, SeatCapacity: e.target.value })}
      />
    </Form.Item>
  </Form>
</Modal>

      <Modal
        visible={isAddEscortModalVisible}
        onCancel={() => setIsAddEscortModalVisible(false)}
        footer={null}
        width={800}
        style={{ marginRight: '100px',height:'200px' }}
      >
        <EscortRegister onClose={() => setIsAddEscortModalVisible(false)} />
      </Modal>
    </>
  );
};

export default ViewEscort;
