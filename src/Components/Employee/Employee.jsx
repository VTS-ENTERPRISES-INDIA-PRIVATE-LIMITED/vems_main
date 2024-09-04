import React, { useState } from 'react'
import { FaUserTie } from "react-icons/fa";
import { PiCarProfile } from "react-icons/pi";
import { TbMapSearch } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import EmpDetails from './EmpDetails'
import './Employee.css'
import Booking from './Booking';

const Employee = () => {
	const [activeTab, setActiveTab] = useState('Employee details');

	const renderContent = () => {
		if (activeTab === 'Employee details') {
			return <EmpDetails/>;
		} else if (activeTab === 'Booking') {
			return <Booking/>;
		} else if (activeTab === 'ML1') {
			return <div>ML1</div>;
		} else if (activeTab === 'ML2') {
			return <div>ML2</div>;
		} else if (activeTab === 'ML3') {
			return <div>ML3</div>;
		}
	};

	return (
		<div className="empContainer">
			<div className="empHeader">
				<div
					className={`empInfoCard ${activeTab === 'Employee details' ? 'active' : ''}`}
					onClick={() => setActiveTab('Employee details')}
				>
					<div className="empInfoLogo">
						<FaUserTie />
					</div>
					Employee Count 
					<p>Count</p>
				</div>
				<div
					className={`empInfoCard ${activeTab === 'Booking' ? 'active' : ''}`}
					onClick={() => setActiveTab('Booking')}
				>
					<div className="empInfoLogo">
						<PiCarProfile />
					</div>
					Booking 
					<p>Count</p>
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML1' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML1')}
				>
					<div className="empInfoLogo">
						<TbMapSearch />
					</div>
					ML1 
					<p>Count</p>
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML2' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML2')}
				>
					<div className="empInfoLogo">
						<GrLocation />
					</div>
					ML2 
					<p>Count</p>
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML3' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML3')}
				>
					<div className="empInfoLogo">

					</div>
					ML3
					<p>Count</p>
				</div>
			</div>
			<div className="empBody">
				{renderContent()}
			</div>
		</div>
	);
};

export default Employee