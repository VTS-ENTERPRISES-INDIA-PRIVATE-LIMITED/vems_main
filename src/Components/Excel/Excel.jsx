import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8083/import-vehicles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            alert('File uploaded successfully!');
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });
    };

    return (
        <div>
            <h2>Upload Excel File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ExcelUpload;
