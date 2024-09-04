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
					Employee Count <FaUserTie />
				</div>
				<div
					className={`empInfoCard ${activeTab === 'Booking' ? 'active' : ''}`}
					onClick={() => setActiveTab('Booking')}
				>
					Booking <PiCarProfile />
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML1' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML1')}
				>
					ML1 <TbMapSearch />
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML2' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML2')}
				>
					ML2 <GrLocation />
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML3' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML3')}
				>
					ML3
				</div>
			</div>
			<div className="empBody">
				{renderContent()}
			</div>
		</div>
	);
};

export default Employee