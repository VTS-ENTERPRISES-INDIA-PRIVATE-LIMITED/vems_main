import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user.css';

const User = () => {
    const [data, setData] = useState([]);
    const [editingVendor, setEditingVendor] = useState(null);
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getAllVendors`);
                if (response && response.data) {
                    setData(response.data.data);
                    console.log(response.data.data);

                } else {
                    // alert('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // alert('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const fetchVendor = async (VendorId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getVendorById/${VendorId}`);
            if (response && response.data) {
                setEditForm(response.data);
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
        navigate(`/vendordetails/${VendorId}`);
    };

    const handleAddVendor = () => {
        navigate('/vendorLogin'); // Navigate to the add vendor page
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
        formData.append('upload_preset', 'Viharikha');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dku9u5u1x/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.secure_url;
        } catch (error) {
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
            {editingVendor ? (
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
                    </form>
                    <button onClick={() => setEditingVendor(null)}>Cancel</button>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default User;
