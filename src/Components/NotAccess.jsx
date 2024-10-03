import React from 'react';
import { Link } from 'react-router-dom';
import './NotAccess.css';
import { FaLock } from 'react-icons/fa';

const NotAccess = () => {
	return (
		<div className="not-access-container">
			<div className="lock-icon">
				<FaLock size={80} />
			</div>
			<h1 className="not-access-title">403 - Access Denied</h1>
			<p className="not-access-message">
				Oops! You don't have permission to access this page.
			</p>
			<Link to="/login" className="home-button">
				Go to Home
			</Link>
		</div>
	);
};

export default NotAccess;
