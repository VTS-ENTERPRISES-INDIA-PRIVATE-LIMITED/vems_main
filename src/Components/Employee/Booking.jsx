import React, { useEffect, useRef, useState } from 'react';
import './Employee.css';

const Booking = () => {
	const [activeLink, setActiveLink] = useState("Morning Shift");
	const [sliderStyle, setSliderStyle] = useState({});
	const navRefs = useRef([]);

	const links = [
		"Morning Shift",
		"Afternoon Shift",
		"Night Shift",
	];

	const tableData = {
		"Morning Shift": [
			{ id: 1, vehicle: "Toyota Camry", driver: "John Doe", bookedAt: "6:00 AM" },
			{ id: 2, vehicle: "Honda Accord", driver: "Jane Smith", bookedAt: "7:00 AM" },
		],
		"Afternoon Shift": [
			{ id: 1, vehicle: "Ford Focus", driver: "Alice Johnson", bookedAt: "1:00 PM" },
			{ id: 2, vehicle: "Chevrolet Malibu", driver: "Bob Brown", bookedAt: "2:00 PM" },
		],
		"Night Shift": [
			{ id: 1, vehicle: "Nissan Altima", driver: "Charlie Green", bookedAt: "10:00 PM" },
			{ id: 2, vehicle: "Hyundai Sonata", driver: "David White", bookedAt: "11:00 PM" },
		],
	};

	useEffect(() => {
		const activeIndex = links.indexOf(activeLink);
		const activeNavRef = navRefs.current[activeIndex];

		if (activeNavRef) {
			setSliderStyle({
				width: `${activeNavRef.offsetWidth}px`,
				left: `${activeNavRef.offsetLeft}px`,
			});
		}
	}, [activeLink]);

	const handleNavClick = (link, index) => {
		setActiveLink(link);
	};

	return (
		<>
			<div className="shiftBar">
				{links.map((link, index) => (
					<div
						key={link}
						className={`shiftLink ${activeLink === link ? "active" : ""}`}
						onClick={() => handleNavClick(link, index)}
						ref={(el) => (navRefs.current[index] = el)}
					>
						{link}
					</div>
				))}
				<div className="shiftSlider" style={sliderStyle} />
			</div>
			<div className="shiftContainer">
				{/* <h2>{activeLink}</h2> */}
				
				<table>
					<thead>
						<tr>
							{Object.keys(tableData[activeLink][0]).map((header) => (
								<th key={header}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableData[activeLink].map((row) => (
							<tr key={row.id}>
								{Object.values(row).map((value, index) => (
									<td key={index}>{value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Booking;
