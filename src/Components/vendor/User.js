import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.css';
import './login.css';
import './Vendordetails.css';
import { message, Modal } from 'antd';
import { FaUser, FaFileAlt, FaPhone, FaDownload, FaUniversity, FaEnvelope, FaMapMarkerAlt, FaMoneyCheckAlt } from 'react-icons/fa';


const CLOUDINARY_UPLOAD_PRESET = 'Viharikha'; // Replace with your preset
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dku9u5u1x/image/upload';

const User = () => {
    const [data, setData] = useState([]);
    const [editingVendor, setEditingVendor] = useState(null);
    const [vendor, setVendor] = useState({
        VendorName: '',
        ContactNumber: '',
        Email: '',
        Address: '',
        AccountHandlerName: '',
        AccountNumber: '',
        BankName: '',
        BranchName: '',
        IFSCCode: '',
        AgreementStartDate: '',
        AgreementEndDate: '',
        AgreementAmount: '',
        AmountPaid: '',
        AadharCardUpload: null,
        AgreementUpload: null
    });
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [editForm, setEditForm] = useState({
        VendorName: '',
        ContactNumber: '',
        Email: '',
        Address: '',
        AccountHandlerName: '',
        AccountNumber: '',
        BankName: '',
        BranchName: '',
        IFSCCode: '',
        AgreementStartDate: '',
        AgreementEndDate: '',
        AgreementAmount: '',
        AmountPaid: '',
        AadharCardUpload: null,
        AgreementUpload: null
    });
    const [formData, setFormData] = useState({
        VendorName: '',
        Email: '',
        ContactNumber: '',
        Address: '',
        AccountHandlerName: '',
        AccountNumber: '',
        BankName: '',
        BranchName: '',
        IFSCCode: '',
        AadharCardUpload: null,
        AgreementUpload: null,
        AgreementStartDate: '',
        AgreementEndDate: '',
        AgreementAmount: '',
        AmountPaid: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getAllVendors`);
            if (response && response.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchVendor = async (VendorId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getVendorById/${VendorId}`);
            if (response && response.data) {
                setEditForm(response.data);
                setVendor(response.data)
            } else {
                console.error('Unexpected response format:', response);
                alert('Unexpected response format');
            }
        } catch (error) {
            console.error('Error fetching vendor details:', error.response || error.message);
            alert('Failed to fetch vendor details. Please check the console for more information.');
        }
    };
    const handleEdit = (VendorId) => {
        fetchVendor(VendorId);
        setEditingVendor(VendorId)
        setEditModal(true)
    };
    const handleDelete = async (VendorId, VendorName) => {
        try {
            const confirmation = window.confirm(`Are you sure you want to delete vendor: ${VendorName}?`);
            if (confirmation) {
                const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/vendor/deleteVendorByName/${VendorId}`);
                if (response.status === 200) {
                    // alert('Vendor deleted successfully');
                    setData(data.filter(item => item.VendorName !== VendorName)); // Update the state
                } else {
                    // alert('Failed to delete vendor');
                }
            }
        } catch (error) {
            console.error('Error deleting vendor:', error);
            // alert('Failed to delete vendor');
        }
    };
    const handleView = (VendorId) => {
        fetchVendor(VendorId);
        setViewModal(true)
    };
    const handleAddVendor = () => {
        setAddModal(true)
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success('File Uploaded..!')
            return response.data.secure_url;
        } catch (error) {
            message.error('Failed to Upload File..!')
            console.error('Image upload failed:', error);
            throw error;
        }
    };
    const handleFileChange = async (e) => {
        const { name, files } = e.target;
        const imgUrl = await uploadToCloudinary(files[0])
        setEditForm({
            ...editForm,
            [name]: imgUrl
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor/addVendor`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response && response.data) {
                console.log(response.data.message);
                message.success(response.data.message)
                setAddModal(false)
            } else {
                message.error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            message.error('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            VendorName: editForm.VendorName,
            ContactNumber: editForm.ContactNumber,
            Email: editForm.Email,
            Address: editForm.Address,
            AccountHandlerName: editForm.AccountHandlerName,
            AccountNumber: editForm.AccountNumber,
            BankName: editForm.BankName,
            BranchName: editForm.BranchName,
            IFSCCode: editForm.IFSCCode,
            AgreementStartDate: editForm.AgreementStartDate,
            AgreementEndDate: editForm.AgreementEndDate,
            AgreementAmount: editForm.AgreementAmount,
            AmountPaid: editForm.AmountPaid,
            AadharCardUpload: editForm.AadharCardUpload,
            AgreementUpload: editForm.AgreementUpload
        }

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/vendor/updateVendorById/${editingVendor}`,
                formData
            );

            if (response.status === 200) {
                setEditingVendor(null);
                setEditForm({
                    VendorName: '',
                    ContactNumber: '',
                    Email: '',
                    Address: '',
                    AccountHandlerName: '',
                    AccountNumber: '',
                    BankName: '',
                    BranchName: '',
                    IFSCCode: '',
                    AgreementStartDate: '',
                    AgreementEndDate: '',
                    AgreementAmount: '',
                    AmountPaid: '',
                    AadharCardUpload: null,
                    AgreementUpload: null
                });

                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user1`);
                        if (response && response.data) {
                            setData(response.data.data);
                        } else {
                            alert('Unexpected response format');
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };
                fetchData();
                console.log('Vendor updated successfully');
            } else {
                alert('Failed to update vendor');
            }
        } catch (error) {
            console.error('Error updating vendor:', error);
        }
    };

    return (
        <div className="show-data-container">
            <h2>Registered Vendors</h2>
            <div className="button-container">
                <button className="add-vendor-button" onClick={handleAddVendor}>Add Vendor</button>
            </div>
            <Modal
                centered
                open={editModal}
                onCancel={() => setEditModal(false)}
                footer={false}
            >
                <div className="edit-form-container">
                    <h3>Edit Vendor</h3>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Vendor Name:
                            <input type="text" name="VendorName" value={editForm.VendorName} onChange={handleChange} required />
                        </label>
                        <label>
                            Contact Number:
                            <input type="text" name="ContactNumber" value={editForm.ContactNumber} onChange={handleChange} required />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="Email" value={editForm.Email} onChange={handleChange} required />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="Address" value={editForm.Address} onChange={handleChange} required />
                        </label>
                        <label>
                            Account Handler Name:
                            <input type="text" name="AccountHandlerName" value={editForm.AccountHandlerName} onChange={handleChange} />
                        </label>
                        <label>
                            Account Number:
                            <input type="text" name="AccountNumber" value={editForm.AccountNumber} onChange={handleChange} />
                        </label>
                        <label>
                            Bank Name:
                            <input type="text" name="BankName" value={editForm.BankName} onChange={handleChange} />
                        </label>
                        <label>
                            Branch Name:
                            <input type="text" name="BranchName" value={editForm.BranchName} onChange={handleChange} />
                        </label>
                        <label>
                            IFSC Code:
                            <input type="text" name="IFSCCode" value={editForm.IFSCCode} onChange={handleChange} />
                        </label>
                        <label>
                            Agreement Start Date:
                            <input type="date" name="AgreementStartDate" value={editForm.AgreementStartDate} onChange={handleChange} />
                        </label>
                        <label>
                            Agreement End Date:
                            <input type="date" name="AgreementEndDate" value={editForm.AgreementEndDate} onChange={handleChange} />
                        </label>
                        <label>
                            Agreement Amount:
                            <input type="number" name="AgreementAmount" value={editForm.AgreementAmount} onChange={handleChange} />
                        </label>
                        <label>
                            Amount Paid:
                            <input type="number" name="AmountPaid" value={editForm.AmountPaid} onChange={handleChange} />
                        </label>
                        <label>
                            Aadhar Card Upload:
                            <input type="file" name="AadharCardUpload" onChange={handleFileChange} />
                        </label>
                        <label>
                            Agreement Upload:
                            <input type="file" name="AgreementUpload" onChange={handleFileChange} />
                        </label>
                        <button type="submit">Update Vendor</button>
                        <button type='button' onClick={() => setEditModal(false)}>Cancel</button>
                    </form>
                </div>
            </Modal>
            <>
                {data.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.VendorName}>
                                    <td>{item.VendorName}</td>
                                    <td>{item.Email}</td>
                                    <td>
                                        <button className="action-button" onClick={() => handleEdit(item.VendorId)}>Edit</button>
                                        <button className="action-button" onClick={() => handleDelete(item.VendorId, item.VendorName)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className="action-button" onClick={() => handleView(item.VendorId)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No vendors available.</p> // Handle the case when no data is available
                )}
            </>
            <Modal
                centered
                open={addModal}
                footer={false}
                onCancel={() => setAddModal(false)}
            >
                <div className="registration-form-container">
                    <form className="vendor-registration-form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Personal Information</h3>
                            <div>
                                <label htmlFor="VendorName">Vendor Name</label>
                                <input
                                    type="text"
                                    id="VendorName"
                                    value={formData.VendorName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Email">Email</label>
                                <input
                                    type="email"
                                    id="Email"
                                    value={formData.Email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="ContactNumber">Contact Number</label>
                                <input
                                    type="text"
                                    id="ContactNumber"
                                    value={formData.ContactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Address">Address</label>
                                <input
                                    type="text"
                                    id="Address"
                                    value={formData.Address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Upload Section */}
                        <div className="form-section">
                            <h3>Upload Section</h3>
                            <div>
                                <label htmlFor="AadharCardUpload">Aadhar Card Upload</label>
                                <input
                                    type="file"
                                    id="AadharCardUpload"
                                    onChange={(e) => handleFileChange(e, 'AadharCardUpload')}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="AgreementUpload">Agreement Upload</label>
                                <input
                                    type="file"
                                    id="AgreementUpload"
                                    onChange={(e) => handleFileChange(e, 'AgreementUpload')}
                                    required
                                />
                            </div>
                        </div>

                        {/* Account Details Section */}
                        <div className="form-section">
                            <h3>Account Details</h3>
                            <div>
                                <label htmlFor="AccountHandlerName">Account Handler Name</label>
                                <input
                                    type="text"
                                    id="AccountHandlerName"
                                    value={formData.AccountHandlerName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="AccountNumber">Account Number</label>
                                <input
                                    type="text"
                                    id="AccountNumber"
                                    value={formData.AccountNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="BankName">Bank Name</label>
                                <input
                                    type="text"
                                    id="BankName"
                                    value={formData.BankName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="BranchName">Branch Name</label>
                                <input
                                    type="text"
                                    id="BranchName"
                                    value={formData.BranchName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="IFSCCode">IFSC Code</label>
                                <input
                                    type="text"
                                    id="IFSCCode"
                                    value={formData.IFSCCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Agreement Details Section */}
                        <div className="form-section">
                            <h3>Agreement Details</h3>
                            <div>
                                <label htmlFor="AgreementStartDate">Agreement Start Date</label>
                                <input
                                    type="date"
                                    id="AgreementStartDate"
                                    value={formData.AgreementStartDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="AgreementEndDate">Agreement End Date</label>
                                <input
                                    type="date"
                                    id="AgreementEndDate"
                                    value={formData.AgreementEndDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="AgreementAmount">Agreement Amount</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="AgreementAmount"
                                    value={formData.AgreementAmount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="AmountPaid">Amount Paid</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="AmountPaid"
                                    value={formData.AmountPaid}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '60px' }}>
                            <button type="button" onClick={() => setAddModal(false)}>Cancel</button>
                            <button type="submit">Register Vendor</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                centered
                open={viewModal}
                onCancel={() => setViewModal(false)}
                footer={false}
                width={800}
            >
                <div className="vendor-registration-container">
                    <div className="vendor-header-card">
                        <div className="vendor-info">
                            <div className="vendor-icon">
                                <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1726825315/car_op9hch.webp" alt="Vendor Profile" />
                            </div>
                            <div className="vendor-details">
                                <h2>{vendor.VendorName}</h2>
                                <p className="vendor-id">{vendor.VendorId}</p>
                                <p className="last-update">Last Update: {new Date(vendor.lastUpdate).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="vendor-status">
                            <button className={vendor.isActive ? "active-button" : "inactive-button"}>
                                {vendor.isActive ? "ACTIVE" : "INACTIVE"}
                            </button>
                        </div>
                    </div>
                    <div className="vendor-stats">
                        {/* Example statistics - adjust as necessary */}
                        <div className="stat-item"><p className="stat-value">{vendor.totalClients}</p><p className="stat-label">Total Clients</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalSites}</p><p className="stat-label">Total Sites</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalDistance} Km</p><p className="stat-label">Total Distance</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalHours}</p><p className="stat-label">Total Hours</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalOfficeTrips}</p><p className="stat-label">Total Office Trips</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalRevenue}</p><p className="stat-label">Total Revenue</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalVehicles}</p><p className="stat-label">Total Vehicles</p></div>
                        <div className="stat-item"><p className="stat-value">{vendor.totalDrivers}</p><p className="stat-label">Total Drivers</p></div>
                        <div className="stat-item"><p className="stat-value">{new Date(vendor.AgreementStartDate).toLocaleDateString()}</p><p className="stat-label">Joined Date</p></div>
                    </div>
                    <div className="personal-info">
                        <h3>Personal Information</h3>
                        <div className="info-block">
                            <p><FaUser /> <strong>Contact Name:</strong> {vendor.VendorName}</p>
                            <p><FaPhone /> <strong>Phone Number:</strong> {vendor.ContactNumber}</p>
                            <p><FaEnvelope /> <strong>Email Address:</strong> {vendor.Email}</p>
                            <p><FaMapMarkerAlt /> <strong>Address:</strong> {vendor.Address}</p>
                        </div>
                    </div>
                    <div className="below-cards">
                        <div className="verification-documents">
                            <h3>Verification Documents Uploads</h3>
                            <div className="document-item">
                                <p><strong>Aadhar Card</strong></p>
                                {vendor.AadharCardUpload ? (
                                    <a href={vendor.AadharCardUpload} download>
                                        <FaDownload /> View
                                    </a>
                                ) : <p>Not uploaded</p>}
                            </div>
                            <div className="document-item">
                                <p><strong>Agreement</strong></p>
                                {vendor.AgreementUpload ? (
                                    <a href={vendor.AgreementUpload} download>
                                        <FaDownload /> View
                                    </a>
                                ) : <p>Not uploaded</p>}
                            </div>
                        </div>

                        <div className="bank-details">
                            <h3>Bank Account Details</h3>
                            <p><FaUniversity /> <strong>Account Holder's Name:</strong> {vendor.AccountHolderName}</p>
                            <p><FaMoneyCheckAlt /> <strong>Account Number:</strong> {vendor.AccountNumber}</p>
                            <p><FaUniversity /> <strong>Bank Name:</strong> {vendor.BankName}</p>
                            <p><FaUniversity /> <strong>Branch Name:</strong> {vendor.BranchName}</p>
                            <p><FaUniversity /> <strong>IFSC Code:</strong> {vendor.IFSCCode}</p>
                            <h3><FaFileAlt /> Agreement Details</h3>
                            <p><strong>Agreement Start Date:</strong> {new Date(vendor.AgreementStartDate).toLocaleDateString()}</p>
                            <p><strong>Agreement End Date:</strong> {new Date(vendor.AgreementEndDate).toLocaleDateString()}</p>
                            <p><strong>Agreement Amount:</strong> {vendor.AgreementAmount}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default User;
