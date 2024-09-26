import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import './EscortDashboard.css'; // Import your custom CSS file

const EscortDashboard = () => {
  const location = useLocation();
  const { escort } = location.state || {}; // Extract escort data from state

  return (
    <div className="dashboard-container">
      <h1>Escort Details</h1>
      {escort ? (
        <Card title={escort.EscortName} className="escort-card">
          <Row gutter={16}>
            <Col span={12}>
              <p><strong>Contact Number:</strong> {escort.ContactNumber}</p>
              <p><strong>Age:</strong> {escort.Age}</p>
              <p><strong>Address:</strong> {escort.Address}</p>
            </Col>
            <Col span={12}>
              <p><strong>Account Handler Name:</strong> {escort.AccountHandlerName}</p>
              <p><strong>Account Number:</strong> {escort.AccountNumber}</p>
              <p><strong>Bank Name:</strong> {escort.BankName}</p>
              <p><strong>Branch Name:</strong> {escort.BranchName}</p>
              <p><strong>IFSC Code:</strong> {escort.IFSCCode}</p>
              <p><strong>Shift:</strong> {escort.Shift}</p>
            </Col>
          </Row>
        </Card>
      ) : (
        <p>No escort details available.</p>
      )}
    </div>
  );
};

export default EscortDashboard;
