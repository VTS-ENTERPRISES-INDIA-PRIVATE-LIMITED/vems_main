import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { BiTaxi } from "react-icons/bi";
import { TbMapSearch } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { RiPinDistanceLine } from "react-icons/ri";
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
						<FaRegUser />
					</div>
					<p>324</p>
					Employee Count 
				</div>
				<div
					className={`empInfoCard ${activeTab === 'Booking' ? 'active' : ''}`}
					onClick={() => setActiveTab('Booking')}
				>
					<div className="empInfoLogo">
						<BiTaxi />
					</div>
					<p>283</p>
					Booking 
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML1' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML1')}
				>
					<div className="empInfoLogo">
						<TbMapSearch />
					</div>
					<p>0</p>
					ML1 
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML2' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML2')}
				>
					<div className="empInfoLogo">
						<GrLocation />
					</div>
					<p>0</p>
					ML2 
				</div>
				<div
					className={`empInfoCard ${activeTab === 'ML3' ? 'active' : ''}`}
					onClick={() => setActiveTab('ML3')}
				>
					<div className="empInfoLogo">
						<RiPinDistanceLine/>
					</div>
					<p>0</p>
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