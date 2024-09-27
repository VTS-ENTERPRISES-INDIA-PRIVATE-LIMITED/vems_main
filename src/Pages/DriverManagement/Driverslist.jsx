
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

  const fetchDrivers = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/drivers`)
      .then((result) => {
        setDrivers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });   
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // const handleModalCancel = () => {
  //   setEditModal(false);
  // }

  const handleAddDriver = () => {
    setEditModal(true);
  };

  const handleDelete = (DriverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteDriver/${DriverId}`)
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
    setEditingDriver({...driver, DOB: driver.DOB ? new Date(driver.DOB).toISOString().split('T')[0] : ""});
    console.log(driver);
    
    setEdittModal(true);
  };

  // const handleSave = () => {
  //   axios.put(`${process.env.REACT_APP_BACKEND_URL}/drivers/${editingDriver.driverId}`, editingDriver)
  //     .then(() => {
  //       setDrivers(drivers.map(d => d.driverId === editingDriver.driverId ? editingDriver : d));
  //       setEditModal(false);
  //       setEditingDriver(null); // Clear editing state
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleSave = () => {
  //   console.log("Saving driver details:", editingDriver); // Log the payload for debugging

  //   axios.put(`${process.env.REACT_APP_BACKEND_URL}/drivers/${editingDriver.driverId}`, editingDriver)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // Update the driver list with the edited driver details
  //         setDrivers(drivers.map(d => d.driverId === editingDriver.driverId ? editingDriver : d));

  //         // Close the modal and clear editing state
  //         setEditModal(false);
  //         setEditingDriver(null);

  //         alert("Driver details updated successfully.");
  //       } else {
  //         console.log("Unexpected response status:", response.status);
  //         alert("Failed to update driver details. Please try again.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating driver details:", error.response || error.message);
  //       alert("Failed to update driver details.");
  //     });
  // };
  const handleSave = () => {
    setEditingDriver((prev)=> ({...prev, DOB:editingDriver.DOB.split('T')[0]}))
    console.log("Saving driver details:", editingDriver);
    
    
    console.log(`${process.env.REACT_APP_BACKEND_URL}/drivers/${editingDriver.DriverId}`);
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/drivers/${editingDriver.DriverId}`, editingDriver)
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
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
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
                <td>{item.Contact}</td>
                <td>{item.Gender}</td>
                <td>{item.Experience} Years</td>
                <td>{item.VendorName}</td>
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
                    // navigate("/driverprofile");
                    <Driverprad/>
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
              value={editingDriver?.Contact}
              onChange={e => setEditingDriver({ ...editingDriver, Contact: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email" className="form-item">
            <Input
              value={editingDriver?.Email}
              onChange={e => setEditingDriver({ ...editingDriver, Email: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Gender" className="form-item">
            <Input
              value={editingDriver?.Gender}
              onChange={e => setEditingDriver({ ...editingDriver, Gender: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Date of Birth" className="form-item">
            <Input
              type="date"
              value={editingDriver?.DOB.split('T')[0]}
              onChange={e => setEditingDriver({ ...editingDriver, DOB: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Address" className="form-item">
            <Input
              value={editingDriver?.Address}
              onChange={e => setEditingDriver({ ...editingDriver, Address: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Aadhar Number" className="form-item">
            <Input
              value={editingDriver?.Aadhar}
              onChange={e => setEditingDriver({ ...editingDriver, Aadhar: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="PAN Number" className="form-item">
            <Input
              value={editingDriver?.Pan}
              onChange={e => setEditingDriver({ ...editingDriver, Pan: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Licence Number" className="form-item">
            <Input
              value={editingDriver?.LicenceNumber}
              onChange={e => setEditingDriver({ ...editingDriver, LicenceNumber: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Experience" className="form-item">
            <Input
              value={editingDriver?.Experience}
              onChange={e => setEditingDriver({ ...editingDriver, Experience: e.target.value })}
            />
          </Form.Item>
          {/* <Form.Item label="Profile Picture">
            <Input
              type="file"
              onChange={e => setEditingDriver({ ...editingDriver, profilePic: e.target.files[0] })}
            />
          </Form.Item> */}
          <Form.Item label="Vendor Name" className="form-item">
            <Input
              value={editingDriver?.VendorName}
              onChange={e => setEditingDriver({ ...editingDriver, VendorName: e.target.value })}
            />
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
        <Newdriver key={12345} />
      </Modal>
    </div>
  );
}

export default Driverslist;

