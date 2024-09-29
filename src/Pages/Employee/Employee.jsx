import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { UploadOutlined, DownloadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import './Employee.css'

const CLOUDINARY_UPLOAD_PRESET = 'Viharikha';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dku9u5u1x/image/upload';

function ExcelUpload() {
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [data, setData] = useState([]);
    const [tripsData, setTripsData] = useState([]);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [employeeImage, setEmployeeImage] = useState(null);

    const [newEmployee, setNewEmployee] = useState({
        EmployeeImage: '',
        EmployeeName: '',
        EmployeeGender: '',
        EmployeeAddress: '',
        EmployeeCity: '',
        Latitude: '',
        Longitude: '',
        EmployeeEmail: '',
        EmployeeContact: '',
        EmployeeEmergencyContact: ''
    });
    const [editedEmployee, setEditedEmployee] = useState({});
    const [error, setError] = useState('');
    const [location, setLocation] = useState({ lat: '', lng: '' });
    const [EditingEmployeeID, setEditingEmployeeID] = useState(null);


    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSaveToDatabase = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employee/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Files uploaded, mails are being sent!");
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset file input
            }
            fetchEmployeeData();
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === 'EmployeeAddress' || name === 'EmployeeCity') {
            const address = name === 'EmployeeAddress' ? value : newEmployee.EmployeeAddress;
            const city = name === 'EmployeeCity' ? value : newEmployee.EmployeeCity;

            if (address && city) {
                try {
                    const apiKey = '4VAIAvF0o7g6gIF6oj7lgSbHWDekpATt';
                    const fullAddress = `${address}, ${city}`;
                    const geocodeResponse = await axios.get(
                        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(fullAddress)}.json`,
                        { params: { key: apiKey } }
                    );

                    const results = geocodeResponse.data.results;

                    if (results.length > 0) {
                        const { lat, lon } = results[0].position;
                        const newLocation = { lat: lat, lng: lon };
                        setLocation(newLocation);
                        setNewEmployee((prev) => ({
                            ...prev,
                            Latitude: newLocation.lat,
                            Longitude: newLocation.lng
                        }));
                        setError("");
                    } else {
                        setError('No results found for the given address.');
                    }
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                    setError('Error fetching coordinates. Please try again.');
                }
            }
        }
        console.log(newEmployee);
        
    };

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setEmployeeImage(selectedImage);
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
            return response.data.secure_url; // Return the uploaded image URL
        } catch (error) {
            console.error('Image upload failed:', error);
            throw error;
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        newEmployee.EmployeeImage = employeeImage ? await uploadToCloudinary(employeeImage) : null;

        const formData = new FormData();
        formData.append('EmployeeImage', newEmployee.EmployeeImage);
        formData.append('EmployeeName', newEmployee.EmployeeName);
        formData.append('EmployeeGender', newEmployee.EmployeeGender);
        formData.append('EmployeeAddress', newEmployee.EmployeeAddress);
        formData.append('EmployeeCity', newEmployee.EmployeeCity);
        formData.append('Latitude', newEmployee.Latitude);
        formData.append('Longitude', newEmployee.Longitude);
        formData.append('EmployeeEmail', newEmployee.EmployeeEmail);
        formData.append('EmployeeContact', newEmployee.EmployeeContact);
        formData.append('EmployeeEmergencyContact', newEmployee.EmployeeEmergencyContact);
        console.log(newEmployee)
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employee/addEmp`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Employee added successfully');
            setIsAddingEmployee(false);
            setNewEmployee({
                EmployeeImage: '',
                EmployeeName: '',
                EmployeeGender: '',
                EmployeeAddress: '',
                EmployeeCity: '',
                Latitude: '',
                Longitude: '',
                EmployeeEmail: '',
                EmployeeContact: '',
                EmployeeEmergencyContact: ''
            });
            setEmployeeImage(null); // Clear image field
            fetchEmployeeData();
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee');
        }
    };

    const handleEditEmployee = (employee) => {
        setEditingEmployeeID(employee.EmployeeId);
        setEditedEmployee(employee);
    };

    const handleEditInputChange = async (e) => {
        const { name, value } = e.target;
        setEditedEmployee((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === 'EmployeeAddress' || name === 'EmployeeCity') {
            const address = name === 'EmployeeAddress' ? value : editedEmployee.EmployeeAddress;
            const city = name === 'EmployeeCity' ? value : editedEmployee.EmployeeCity;
            console.log(address);
            console.log(city);

            if (address && city) {
                try {
                    const apiKey = '4VAIAvF0o7g6gIF6oj7lgSbHWDekpATt';
                    const fullAddress = `${address}, ${city}`;
                    const geocodeResponse = await axios.get(
                        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(fullAddress)}.json`,
                        { params: { key: apiKey } }
                    );

                    const results = geocodeResponse.data.results;
                    console.log(results);


                    if (results.length > 0) {
                        const { lat, lon } = results[0].position;
                        const newLocation = { lat, lng: lon };
                        setEditedEmployee((prev) => ({
                            ...prev,
                            Latitude: newLocation.lat,
                            Longitude: newLocation.lng
                        }));


                        setError("");
                    } else {
                        setError('No results found for the given address.');
                    }
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                    setError('Error fetching coordinates. Please try again.');
                }
            }
        }
    };

    const handleSaveEditedEmployee = async () => {
        const formData = new FormData();
        Object.keys(editedEmployee).forEach(key => formData.append(key, editedEmployee[key]));
        console.log("editedEmployee", editedEmployee)

        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/employee/updateEmpById/${EditingEmployeeID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Employee updated successfully');
            setEditingEmployeeID(null);
            setEmployeeImage(null);
            fetchEmployeeData();

        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Failed to update employee');
        }
    };

    const handleDeleteEmployee = async (EmployeeId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/employee/deleteEmpById/${EmployeeId}`);
            alert('Employee deleted successfully');
            fetchEmployeeData();
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee');
        }
    };

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/getAllEmp`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const fetchTripsData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/emp/showtrips`);
            setTripsData(response.data);
        } catch (error) {
            console.error('Error fetching trips data:', error);
        }
    };

    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });
    };

    const generateExcelReport = () => {
        const reportData = tripsData.map(trip => {
            const employee = data.find(emp => emp.EmployeeId === trip.EmployeeId);
            return {
                "Booking ID": trip.Id,
                "Employee ID": trip.EmployeeId,
                "Date": formatDateTime(trip.Date),
                "In Time": trip.InTime,
                "Out Time": trip.OutTime,
                "Employee Name": employee ? employee.EmployeeName : '',
                "Gender": employee ? employee.EmployeeGender : '',
                "Address": employee ? employee.EmployeeAddress : '',
                "City": employee ? employee.EmployeeCity : '',
                "Latitude": employee ? employee.Latitude : '',
                "Longitude": employee ? employee.Longitude : '',
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(reportData);

        // Set custom column widths
        worksheet['!cols'] = [
            { wch: 12 }, // Booking ID
            { wch: 12 }, // Employee ID
            { wch: 12 }, // Date
            { wch: 10 }, // In Time
            { wch: 10 }, // Out Time
            { wch: 20 }, // Employee Name
            { wch: 8 }, // Gender
            { wch: 30 }, // Address
            { wch: 12 },  // City
            { wch: 12 }, // Latitude
            { wch: 12 } // Longitude
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trips Report');

        XLSX.writeFile(workbook, 'TripsReport.xlsx');
    };

    useEffect(() => {
        fetchEmployeeData();
        fetchTripsData();
    }, []);

    const filteredData = data.filter(employee =>
        employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className='mm-ff'>
                <h1 className='employ-head'>Employee Dashboard</h1>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Upload
                            accept=".xlsx, .xls"
                            showUploadList={false}
                            beforeUpload={(file) => {
                                handleFileUpload({ target: { files: [file] } });
                                return false; // Prevent auto-upload
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>

                        <button
                            className="upload-excel"
                            onClick={handleSaveToDatabase}
                            disabled={!file}
                            style={{ height: "31px", marginLeft: "10px" }}
                        >
                            Upload
                        </button>
                        {file && (
                            <span style={{ fontSize: "14px", color: "#666" }}><PaperClipOutlined /> {file.name}</span>
                        )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <button
                            className="add-employee-button"
                            onClick={() => setIsAddingEmployee(true)}
                        >
                            Add Employee
                        </button>

                        <button className="download-report" onClick={generateExcelReport}>
                            <DownloadOutlined /> Excel
                        </button>
                    </div>
                </div>

                {/* Popup form to add employee */}
                {isAddingEmployee && (
                    <div className="overlay">
                        <div className="add-employee-form">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2>Add New Employee</h2>
                                <button style={{ padding: "5px", background: "red" }} onClick={() => {
                                    setIsAddingEmployee(false);
                                    setNewEmployee({
                                        EmployeeImage: '',
                                        EmployeeName: '',
                                        EmployeeGender: '',
                                        EmployeeAddress: '',
                                        EmployeeCity: '',
                                        Latitude: '',
                                        Longitude: '',
                                        EmployeeEmail: '',
                                        EmployeeContact: '',
                                        EmployeeEmergencyContact: ''
                                    });
                                    setEmployeeImage(null);
                                }}>X</button>
                            </div>
                            <form onSubmit={handleAddEmployee}>
                                <input
                                    type="text"
                                    name="EmployeeName"
                                    placeholder="Employee Name"
                                    value={newEmployee.EmployeeName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <select
                                    name="EmployeeGender"
                                    value={newEmployee.EmployeeGender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <input
                                    type="text"
                                    name="EmployeeAddress"
                                    placeholder="Address"
                                    value={newEmployee.EmployeeAddress}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="EmployeeCity"
                                    placeholder="City"
                                    value={newEmployee.EmployeeCity}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="Latitude"
                                    placeholder="Latitude"
                                    value={newEmployee.Latitude}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name="Longitude"
                                    placeholder="Longitude"
                                    value={newEmployee.Longitude}
                                    readOnly
                                />
                                <input
                                    type="email"
                                    name="EmployeeEmail"
                                    placeholder="Email"
                                    value={newEmployee.EmployeeEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="EmployeeContact"
                                    placeholder="Contact Number"
                                    value={newEmployee.EmployeeContact}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="EmployeeEmergencyContact"
                                    placeholder="Emergency Contact Number"
                                    value={newEmployee.EmployeeEmergencyContact}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Upload
                                    accept="image/*"
                                    beforeUpload={file => {
                                        handleImageUpload({ target: { files: [file] } });
                                        return false; // Prevent automatic upload
                                    }}
                                    required
                                >
                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                </Upload>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div style={{ display: "flex", justifyContent: "center", margin: "5px 0" }}>
                                    <button className='addemp-btn' type="submit">Add Employee</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Employee Data Table */}
                {data.length > 0 && (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                            <h3 className='table-heading'>Employee Table : </h3>
                            <input
                                type="text"
                                placeholder="Search by Name..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                        </div>
                        <div className="table-container">
                            <table className="employee-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Email</th>
                                        <th>Contact No.</th>
                                        <th>Emergency No.</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((employee) => (
                                        <tr key={employee.EmployeeId}>
                                            <td><img className='employee-image' src={employee.EmployeeImage} alt="Profile" width="50" height="50" /></td>
                                            <td>{employee.EmployeeId}</td>
                                            {EditingEmployeeID === employee.EmployeeId ? (
                                                <>
                                                    {/* Render input fields when in edit mode */}
                                                    <td><input type="text" name="EmployeeName" value={editedEmployee.EmployeeName} onChange={handleEditInputChange} /></td>
                                                    <td><input type="text" name="EmployeeGender" value={editedEmployee.EmployeeGender} onChange={handleEditInputChange} /></td>
                                                    <td><input type="text" name="EmployeeAddress" value={editedEmployee.EmployeeAddress} onChange={handleEditInputChange} /></td>
                                                    <td><input type="text" name="EmployeeCity" value={editedEmployee.EmployeeCity} onChange={handleEditInputChange} /></td>
                                                    <td>{employee.EmployeeEmail}</td>
                                                    <td><input type="text" name="EmployeeContact" value={editedEmployee.EmployeeContact} onChange={handleEditInputChange} /></td>
                                                    <td><input type="text" name="EmployeeEmergencyContact" value={editedEmployee.EmployeeEmergencyContact} onChange={handleEditInputChange} /></td>
                                                    <td>
                                                        <div className='button-container'>
                                                            <button className="green-btn" onClick={handleSaveEditedEmployee}>Save</button>
                                                            <button className="red-btn" onClick={() => setEditingEmployeeID(null)}>Cancel</button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    {/* Render static values when not in edit mode */}
                                                    <td>{employee.EmployeeName}</td>
                                                    <td>{employee.EmployeeGender}</td>
                                                    <td>{employee.EmployeeAddress}</td>
                                                    <td>{employee.EmployeeCity}</td>
                                                    <td>{employee.EmployeeEmail}</td>
                                                    <td>{employee.EmployeeContact}</td>
                                                    <td>{employee.EmployeeEmergencyContact}</td>
                                                    <td>
                                                        <div className='button-container'>
                                                            <button className="green-btn" onClick={() => handleEditEmployee(employee)}>Edit</button>
                                                            <button className="red-btn" onClick={() => handleDeleteEmployee(employee.EmployeeId)}>Delete</button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <br />

                {/* Trips Data Table */}
                {tripsData.length > 0 && (
                    <>
                        <h3 className='table-heading'>Cab Requests Table : </h3>
                        <div className="table-container">
                            <table className="trips-table">
                                <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Employee ID</th>
                                        <th>Date</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tripsData.map((trip) => (
                                        <tr key={trip.Id}>
                                            <td>{trip.Id}</td>
                                            <td>{trip.EmployeeId}</td>
                                            <td>{formatDateTime(trip.Date)}</td>
                                            <td>{trip.InTime}</td>
                                            <td>{trip.OutTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ExcelUpload;