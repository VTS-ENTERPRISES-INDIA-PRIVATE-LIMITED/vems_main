
import { IoEyeOutline } from "react-icons/io5";
import "./driverslist.css";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Newdriver from "./Newdriver";
import Driverprad from "./Driverprad";

function Driverslist() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [edittModal, setEdittModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null); // State for the driver being edited
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [vendors, setVendors] = useState([]);

  const fetchDrivers = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/driver/getAllDrivers`)
      .then((result) => {
        setDrivers(result.data);
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getIdnName`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchVendors();
  }, []);


  const handleAddDriver = () => {
    setEditModal(true);
  };

  const handleDelete = (DriverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/driver/deleteDriverById/${DriverId}`)
        .then(() => {
          alert("Deleted successfully");
          fetchDrivers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver({ ...driver, DriverDOB: driver.DriverDOB ? new Date(driver.DriverDOB).toISOString().split('T')[0] : "" });
    console.log(driver);

    setEdittModal(true);
  };

  const handleSave = () => {
    // setEditingDriver((prev) => ({ ...prev, DriverDOB: editingDriver.DriverDOB.split('T')[0] }))
    console.log(editingDriver);
    
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/driver/updateDriverById/${editingDriver.DriverId}`, editingDriver)
      .then((response) => {

        if (response.status === 200) {
          setDrivers(drivers.map(d => d.DriverId === editingDriver.DriverId ? editingDriver : d));
          setEdittModal(false);
          setEditingDriver(null);
          alert("Driver details updated successfully.");
        } else {
          console.log("Unexpected response status:", response.status);
          alert("Failed to update driver details. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error updating driver details:", error);
        alert("Failed to update driver details.");
      });
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.DriverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.DriverId.toString().includes(searchQuery)
  );

  return (
    <div className="view-drivers-page">
      <div className="man-sear-add">
        <h2 className="Mage-driver">Manage Driver</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="add-driver" onClick={handleAddDriver}>
            <b>Add Driver +</b>
          </button>
          <input
            className="search-input"
            type="text"
            placeholder="Search by driver name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="driver-list-card">
        <table className="driver-table">
          <thead>
            <tr>
              <th>Driver Id</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Gender</th>
              <th>Experience</th>
              <th>Vendor Name</th>
              <th>Action</th>
              <th>View More</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((item, index) => (
              <tr key={index}>
                <td>{item.DriverId}</td>
                <td>{item.DriverName}</td>
                <td>{item.DriverPhone}</td>
                <td>{item.DriverGender}</td>
                <td>{item.DriverExperience} Years</td>
                <td>{vendors.find(v => v.VendorId === item.VendorId)?.VendorName}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(item.DriverId)}>
                    Delete
                  </button>
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("driverId", item.DriverId);
                    navigate("/viewDriver");
                  }}
                >
                  <IoEyeOutline style={{ color: "#00007F" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title={editingDriver ? "Edit Driver" : "Add Driver"}
        open={edittModal}
        onCancel={() => setEdittModal(false)}
        footer={[
          <button
            key="cancel"
            onClick={() => setEdittModal(false)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              marginRight: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            onClick={handleSave}
            style={{
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>

        ]}
        width={800}
        style={{ marginRight: '300px' }}
      >
        <Form layout="vertical" className="modal-form">
          <Form.Item label="Driver Name" className="form-item">
            <Input
              value={editingDriver?.DriverName}
              onChange={e => setEditingDriver({ ...editingDriver, DriverName: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Contact" className="form-item">
            <Input
              value={editingDriver?.DriverPhone}
              onChange={e => setEditingDriver({ ...editingDriver, DriverPhone: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email" className="form-item">
            <Input
              value={editingDriver?.DriverEmail}
              onChange={e => setEditingDriver({ ...editingDriver, DriverEmail: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Gender" className="form-item">
            <Input
              value={editingDriver?.DriverGender}
              onChange={e => setEditingDriver({ ...editingDriver, DriverGender: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Date of Birth" className="form-item">
            <Input
              type="date"
              value={editingDriver?.DriverDOB.split('T')[0]}
              onChange={e => setEditingDriver({ ...editingDriver, DriverDOB: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Address" className="form-item">
            <Input
              value={editingDriver?.DriverAddress}
              onChange={e => setEditingDriver({ ...editingDriver, DriverAddress: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Aadhar Number" className="form-item">
            <Input
              value={editingDriver?.DriverAadhar}
              onChange={e => setEditingDriver({ ...editingDriver, DriverAadhar: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="PAN Number" className="form-item">
            <Input
              value={editingDriver?.DriverPAN}
              onChange={e => setEditingDriver({ ...editingDriver, DriverPAN: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Licence Number" className="form-item">
            <Input
              value={editingDriver?.DriverLicense}
              onChange={e => setEditingDriver({ ...editingDriver, DriverLicense: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Experience" className="form-item">
            <Input
              value={editingDriver?.DriverExperience}
              onChange={e => setEditingDriver({ ...editingDriver, DriverExperience: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Vendor Name" className="form-item">
            <select
              value={editingDriver?.VendorId || ''}
              onChange={e => {
                const selectedVendorId = e.target.value;
                setEditingDriver({
                  ...editingDriver,
                  VendorId: selectedVendorId
                });
              }}
            >
              <option value="" disabled>Select Vendor</option>
              {vendors.map(vendor => (
                <option key={vendor.VendorId} value={vendor.VendorId}>
                  {vendor.VendorName}
                </option>
              ))}
            </select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Driver"
        open={editModal}
        footer={null}
        width="60vw"
        height="50vh"
        onCancel={() => setEditModal(false)}
      >
        <Newdriver />
      </Modal>
    </div>
  );
}

export default Driverslist;

