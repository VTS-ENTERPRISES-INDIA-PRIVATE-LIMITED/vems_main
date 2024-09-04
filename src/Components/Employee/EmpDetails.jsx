import React, { useState } from 'react';
import './Employee.css';

const EmpDetails = () => {
	const [employeeData, setEmployeeData] = useState([
		{
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			contact: "123-456-7890",
			bookingStatus: "Confirmed",
			pickupStatus: "Pending",
			dropStatus: "Pending",
			bookingTime: "2024-09-01 08:00 AM",
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			contact: "987-654-3210",
			bookingStatus: "Cancelled",
			pickupStatus: "N/A",
			dropStatus: "N/A",
			bookingTime: "2024-09-01 09:00 AM",
		},
		{
			id: 3,
			name: "Alice Johnson",
			email: "alice@example.com",
			contact: "456-789-1230",
			bookingStatus: "Confirmed",
			pickupStatus: "Completed",
			dropStatus: "Pending",
			bookingTime: "2024-09-01 10:00 AM",
		},
		// Add more employee data as needed
	]);

	const [searchTerm, setSearchTerm] = useState('');
	const [filters, setFilters] = useState({
		bookingStatus: '',
		pickupStatus: '',
		dropStatus: '',
	});

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		});
	};

	const filteredData = employeeData.filter(emp =>
		emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
		(filters.bookingStatus === '' || emp.bookingStatus === filters.bookingStatus) &&
		(filters.pickupStatus === '' || emp.pickupStatus === filters.pickupStatus) &&
		(filters.dropStatus === '' || emp.dropStatus === filters.dropStatus)
	);

	const handleAddEmployee = () => {
		// Logic to add an employee
		console.log("Add Employee button clicked");
	};

	const handleUploadExcel = () => {
		// Logic to upload an Excel file
		console.log("Upload Excel button clicked");
	};

	const handleDownload = () => {
		// Logic to download the data
		console.log("Download button clicked");
	};

	return (
		<div className="employeeContainer">
			<h2>Employee Booking Details</h2>
			<div className="headerContainer">
				<div className="headerLeft">
					<input
						type="text"
						placeholder="Search employee..."
						value={searchTerm}
						onChange={handleSearch}
						className="searchInput"
					/>
					<select name="bookingStatus" value={filters.bookingStatus} onChange={handleFilterChange} className="filterSelect">
						<option value="">All Booking Status</option>
						<option value="Confirmed">Confirmed</option>
						<option value="Cancelled">Cancelled</option>
					</select>
					<select name="pickupStatus" value={filters.pickupStatus} onChange={handleFilterChange} className="filterSelect">
						<option value="">All Pickup Status</option>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
						<option value="N/A">N/A</option>
					</select>
					<select name="dropStatus" value={filters.dropStatus} onChange={handleFilterChange} className="filterSelect">
						<option value="">All Drop Status</option>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
						<option value="N/A">N/A</option>
					</select>
				</div>
				<div className="headerRight">
					<button onClick={handleAddEmployee} className="headerButton">Add Employee</button>
					<button onClick={handleUploadExcel} className="headerButton">Upload Excel</button>
					<button onClick={handleDownload} className="headerButton">Download</button>
				</div>
			</div>
			<table className="employeeTable">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Contact</th>
						<th>Booking Status</th>
						<th>Pickup Status</th>
						<th>Drop Status</th>
						<th>Booking Time</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((emp) => (
						<tr key={emp.id}>
							<td>{emp.id}</td>
							<td>{emp.name}</td>
							<td>{emp.email}</td>
							<td>{emp.contact}</td>
							<td>{emp.bookingStatus}</td>
							<td>{emp.pickupStatus}</td>
							<td>{emp.dropStatus}</td>
							<td>{emp.bookingTime}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EmpDetails;
