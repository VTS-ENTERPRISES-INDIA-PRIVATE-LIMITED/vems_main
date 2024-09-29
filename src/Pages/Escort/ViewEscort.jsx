import { Modal, Table, Form, Input, Upload, Button, TimePicker, InputNumber, Row, Col, message } from 'antd';
// import moment from 'moment';
import { SearchOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewEscort.css';

const ViewEscort = () => {
  const [escorts, setEscorts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingEscort, setEditingEscort] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addEscortModal, setAddEscortModal] = useState(false)

  const [formData, setFormData] = useState({
    EscortName: '',
    EscortProfilePicUpload: null,
    ContactNumber: '',
    Age: '',
    AadharCardUpload: null,
    Address: '',
    CertificationUpload: null,
    AccountHandlerName: '',
    AccountNumber: '',
    BankName: '',
    IFSCCode: '',
    BranchName: '',
    ShiftStartTime: '',
    ShiftEndTime: ''
});

  const handleSubmit = async () => {
    console.log("Form Submitted with Data: ", formData);
    try {
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/escort/addEscort`, formData);
  
      if (response.status === 200) {
        message.success('Escort added successfully');
        setAddEscortModal(false);
    }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to add escort. Please try again.");
      setAddEscortModal(false);
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/escort/getAllEscorts`)
      .then((result) => {
        console.log(result.data.data);
        setEscorts(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Viharikha');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dku9u5u1x/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadChange = async (e, field) => {
    setFormData({
      ...formData,
      [field]: await uploadToCloudinary(e.target.files[0]),
    });
  };

  const handleSearch = (value) => {
    setSearchText(value ? value.toLowerCase() : '');
    console.log('Search value:', value); // Log the search input value
  };

  const handleEdit = (escort) => {
    setEditingEscort(escort);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/escort/updateEscortById/${editingEscort.EscortId}`, editingEscort)
      .then((response) => {
        setEscorts(escorts.map(e => e.EscortId === editingEscort.EscortId ? editingEscort : e));
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (escort) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this escort?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/escort/deleteEscortById/${escort.EscortId}`)
          .then((response) => {
            setEscorts(escorts.filter(e => e.EscortId !== escort.EscortId));
          })
          .catch((error) => {
            console.error('Error deleting escort:', error.response?.data || error.message);
          });
      },
    });
  };

  const handleAddEscort = () => {
    setAddEscortModal(true);
  };

  const filteredEscorts = escorts.filter(escort =>
    (escort.EscortName || '').toLowerCase().includes(searchText) ||
    (escort.ContactNumber || '').toLowerCase().includes(searchText)
  );

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString?.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  const columns = [
    {
      title: 'S.No',
      key: 'sno',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Escort Name',
      dataIndex: 'EscortName',
      key: 'EscortName',
    },
    {
      title: 'Contact Number',
      dataIndex: 'ContactNumber',
      key: 'ContactNumber',
    },
    {
      title: 'Shift',
      key: 'Shift',
      render: (text, record) => (
        <span>
          {formatTime(record.ShiftStartTime)} - {formatTime(record.ShiftEndTime)}
        </span>
      ),
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
        <Button type="link" icon={<EyeOutlined />} onClick={() => (record)} />
      ),
    }
  ];


  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddEscort}>
          Add Escort +
        </Button>
        <Input
          placeholder="Search Escorts"
          prefix={<SearchOutlined />}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>

      {filteredEscorts.length === 0 ? (
        <div>No escort details available.</div>
      ) : (
        <Table
          dataSource={filteredEscorts}
          columns={columns}
          rowKey="EscortId"
          pagination={{ pageSize: 7 }}
        />
      )}

      <Modal
        title="Edit Escort"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        style={{ marginRight: '150px' }}
      >
        <Form layout="vertical" className="escort-form">
          <div className="form-grid">
            <Form.Item label="Escort Name">
              <Input
                value={editingEscort?.EscortName}
                onChange={e => setEditingEscort({ ...editingEscort, EscortName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Contact Number">
              <Input
                value={editingEscort?.ContactNumber}
                onChange={e => setEditingEscort({ ...editingEscort, ContactNumber: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Age">
              <Input
                value={editingEscort?.Age}
                onChange={e => setEditingEscort({ ...editingEscort, Age: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                value={editingEscort?.Address}
                onChange={e => setEditingEscort({ ...editingEscort, Address: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Account Handler Name">
              <Input
                value={editingEscort?.AccountHandlerName}
                onChange={e => setEditingEscort({ ...editingEscort, AccountHandlerName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Account Number">
              <Input
                value={editingEscort?.AccountNumber}
                onChange={e => setEditingEscort({ ...editingEscort, AccountNumber: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Bank Name">
              <Input
                value={editingEscort?.BankName}
                onChange={e => setEditingEscort({ ...editingEscort, BankName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Branch Name">
              <Input
                value={editingEscort?.BranchName}
                onChange={e => setEditingEscort({ ...editingEscort, BranchName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="IFSC Code">
              <Input
                value={editingEscort?.IFSCCode}
                onChange={e => setEditingEscort({ ...editingEscort, IFSCCode: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Shift">
              <Input
                value={editingEscort?.Shift}
                onChange={e => setEditingEscort({ ...editingEscort, Shift: e.target.value })}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Escort Details"
        visible={addEscortModal}
        onCancel={() => setAddEscortModal(false)}
        // footer={null}
        onOk={handleSubmit}
      >
        <form className="escort-form">
          <div className="form-row">
            <div className="form-group">
              <label>Escort Name:</label>
              <input
                type="text"
                name="EscortName"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Escort Profile Pic:</label>
              <input
                type="file"
                name="EscortProfilePicUpload"
                onChange={(e) => handleUploadChange(e, 'EscortProfilePicUpload')}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="number"
                name="ContactNumber"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="Age"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aadhar Card:</label>
              <input
                type="file"
                name="AadharCardUpload"
                onChange={(e) => handleUploadChange(e, 'AadharCardUpload')}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="Address"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Certification Upload:</label>
              <input
                type="file"
                name="CertificationUpload"
                onChange={(e) => handleUploadChange(e, 'CertificationUpload')}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Account Handler Name:</label>
              <input
                type="text"
                name="AccountHandlerName"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Account Number:</label>
              <input
                type="text"
                name="AccountNumber"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Bank Name:</label>
              <input
                type="text"
                name="BankName"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>IFSC Code:</label>
              <input
                type="text"
                name="IFSCCode"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Branch Name:</label>
              <input
                type="text"
                name="BranchName"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Shift Time Inputs in a Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Shift Start Time:</label>
              <input
                type="time"
                name="ShiftStartTime"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Shift End Time:</label>
              <input
                type="time"
                name="ShiftEndTime"
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ViewEscort;

