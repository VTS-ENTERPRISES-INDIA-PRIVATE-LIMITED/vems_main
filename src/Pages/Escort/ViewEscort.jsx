// import { Table, Button, Input, Modal, Form } from 'antd';
// import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom'; 
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ViewEscort.css'; 
// import EscortRegister from '../Escort/EscortRegister';
// import EscortDashboard from './EscortDashboard';

// const ViewEscort = () => {
//   const navigate = useNavigate(); 
//   const [escorts, setEscorts] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [editingEscort, setEditingEscort] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isAddEscortModalVisible, setIsAddEscortModalVisible] = useState(false); 
//   const [isEscortDashboardModalVisible, setIsEscortDashboardModalVisible] = useState(false); 

//   useEffect(() => {
//     axios.get("http://localhost:8081/escorts")
//       .then((result) => {
//         console.log(result.data.data); 
//         setEscorts(result.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   useEffect(() => {
//     console.log('Escorts state:', escorts); // Log escorts state
// }, [escorts]);
 
  
  
// const handleSearch = (value) => {
//   setSearchText(value ? value.toLowerCase() : '');
//   console.log('Search value:', value); // Log the search input value
// };

// // const filteredEscorts = escorts.filter(escort =>
// //   (escort.EscortName || '').toLowerCase().includes(searchText) ||
// //   (escort.ContactNumber || '').toLowerCase().includes(searchText)
// // );

// console.log('Current search text:', searchText);

//   const handleEdit = (escort) => {
//     setEditingEscort(escort);
//     setIsModalVisible(true);
//   };

//   const handleSave = () => {
//     axios.put(`http://localhost:8081/escorts/${editingEscort.EscortId}`, editingEscort)
//       .then((response) => {
//         setEscorts(escorts.map(e => e.EscortId === editingEscort.EscortId ? editingEscort : e));
//         setIsModalVisible(false);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleDelete = (escort) => {
//     console.log(escort.EscortId); 
  
//     Modal.confirm({
//       title: 'Are you sure you want to delete this escort?',
//       content: 'This action cannot be undone.',
//       okText: 'Yes',
//       okType: 'danger',
//       cancelText: 'No',
//       onOk: () => {
//         axios.delete(`http://localhost:8081/escorts/${escort.EscortId}`)
//           .then((response) => {
          
//             setEscorts(escorts.filter(e => e.EscortId !== escort.EscortId));
//           })
//           .catch((error) => {
//             console.error('Error deleting escort:', error.response?.data || error.message);
//         });
        
//       },
//       onCancel: () => {
//         console.log('Cancel delete action');
//       }
//     });
//   };
  
  
//   const handleAddEscort = () => {
//     setIsAddEscortModalVisible(true);
//   };
//   const handleEscortDashboard = () => {
//     setIsEscortDashboardModalVisible(true);
//   };
//   const filteredEscorts = escorts.filter(escort =>
//     (escort.EscortName || '').toLowerCase().includes(searchText) ||
//     (escort.ContactNumber || '').toLowerCase().includes(searchText)
//   );
  
//     console.log('Filtered escorts:', filteredEscorts);

//   const columns = [
//     {
//       title: 'S.No',
//       key: 'sno',
//       render: (text, record, index) => index + 1,  
//     },
//     {
//       title: 'Escort Name',
//       dataIndex: 'EscortName',
//       key: 'EscortName',
//     },
//     {
//       title: 'Contact Number',
//       dataIndex: 'ContactNumber',
//       key: 'ContactNumber',
//     },
//     {
//       title: 'Shift',
//       dataIndex: 'Shift',
//       key: 'Shift',
      
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <span>
//           <Button type="link" className="edit-button" onClick={() => handleEdit(record)}>Edit</Button>
//           <Button type="link" danger className="delete-button" onClick={() => handleDelete(record)}>Delete</Button>
//         </span>
//       ),
//     },
//     {
//       title: 'View More',
//       key: 'viewMore',
//       render: (text, record) => (
//         <Button type="link" icon={<EyeOutlined />} onClick={handleEscortDashboard}/>
//       ),
//     }
//   ];
//   {filteredEscorts.length === 0 ? (
//     <div>No escort details available.</div>
//   ) : (
//     <Table
//       dataSource={filteredEscorts}
//       columns={columns}
//       rowKey="EscortId" 
//       pagination={{ pageSize: 7 }}
//     />
//   )}
  

//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
//         <Button type="primary" onClick={handleAddEscort}>
//           Add Escort +
//         </Button>
//         <Input
//           placeholder="Search Escorts"
//           prefix={<SearchOutlined />}
//           onChange={e => handleSearch(e.target.value)}
//           style={{ width: 200 }}
//         />
//       </div>
//       <Table
//   dataSource={filteredEscorts}
//   columns={columns}
//   rowKey="EscortId" 
//   pagination={{ pageSize: 7 }}
// />

      
//       <Modal
//   title="Edit Escort"
//   visible={isModalVisible}
//   onOk={handleSave}
//   onCancel={() => setIsModalVisible(false)}
//   width={800}
// >
//   <Form layout="vertical" className="escort-form">
//     <div className="form-grid">
//       <Form.Item label="Escort Name">
//         <Input
//           value={editingEscort?.EscortName}
//           onChange={e => setEditingEscort({ ...editingEscort, EscortName: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Contact Number">
//         <Input
//           value={editingEscort?.ContactNumber}
//           onChange={e => setEditingEscort({ ...editingEscort, ContactNumber: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Age">
//         <Input
//           value={editingEscort?.Age}
//           onChange={e => setEditingEscort({ ...editingEscort, Age: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Address">
//         <Input
//           value={editingEscort?.Address}
//           onChange={e => setEditingEscort({ ...editingEscort, Address: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Account Handler Name">
//         <Input
//           value={editingEscort?.AccountHandlerName}
//           onChange={e => setEditingEscort({ ...editingEscort, AccountHandlerName: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Account Number">
//         <Input
//           value={editingEscort?.AccountNumber}
//           onChange={e => setEditingEscort({ ...editingEscort, AccountNumber: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Bank Name">
//         <Input
//           value={editingEscort?.BankName}
//           onChange={e => setEditingEscort({ ...editingEscort, BankName: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Branch Name">
//         <Input
//           value={editingEscort?.BranchName}
//           onChange={e => setEditingEscort({ ...editingEscort, BranchName: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="IFSC Code">
//         <Input
//           value={editingEscort?.IFSCCode}
//           onChange={e => setEditingEscort({ ...editingEscort, IFSCCode: e.target.value })}
//         />
//       </Form.Item>
//       <Form.Item label="Shift">
//         <Input
//           value={editingEscort?.Shift}
//           onChange={e => setEditingEscort({ ...editingEscort, Shift: e.target.value })}
//         />
//       </Form.Item>
//     </div>
//   </Form>
// </Modal>



//       <Modal
//         visible={isAddEscortModalVisible}
//         onCancel={() => setIsAddEscortModalVisible(false)}
//         footer={null}
//         width={800}
//         style={{ 
//           marginTop:'-30px',
//           marginRight:'200px' 
//         }}
//       >
//         <EscortRegister onClose={() => setIsAddEscortModalVisible(false)} />
//       </Modal>
//       <Modal
//         visible={isEscortDashboardModalVisible}
//         onCancel={() => setIsEscortDashboardModalVisible(false)}
//         footer={null}
//         width={800}
//         style={{ 
//           marginTop:'-30px',
//           marginRight:'200px' 
//         }}
//       >
//         <EscortDashboard onClose={() => setIsEscortDashboardModalVisible(false)} />
//       </Modal>
//     </>
//   );
// };

// export default ViewEscort; 
import { Table, Button, Input, Modal, Form } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewEscort.css';

const ViewEscort = () => {
  const [escorts, setEscorts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingEscort, setEditingEscort] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddEscortModalVisible, setIsAddEscortModalVisible] = useState(false); 
  const [isEscortDashboardModalVisible, setIsEscortDashboardModalVisible] = useState(false); 
  const [selectedEscort, setSelectedEscort] = useState(null); 

  useEffect(() => {
    axios.get("http://localhost:8081/escorts")
      .then((result) => {
        console.log(result.data.data); 
        setEscorts(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value ? value.toLowerCase() : '');
    console.log('Search value:', value); // Log the search input value
  };

  const handleEdit = (escort) => {
    setEditingEscort(escort);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/escorts/${editingEscort.EscortId}`, editingEscort)
      .then((response) => {
        setEscorts(escorts.map(e => e.EscortId === editingEscort.EscortId ? editingEscort : e));
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (escort) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this escort?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete(`http://localhost:8081/escorts/${escort.EscortId}`)
          .then((response) => {
            setEscorts(escorts.filter(e => e.EscortId !== escort.EscortId));
          })
          .catch((error) => {
            console.error('Error deleting escort:', error.response?.data || error.message);
        });
      },
    });
  };

  const handleAddEscort = () => {
    setIsAddEscortModalVisible(true);
  };

  const handleEscortDashboard = (escort) => {
    setSelectedEscort(escort); 
    setIsEscortDashboardModalVisible(true);
  };

  const filteredEscorts = escorts.filter(escort =>
    (escort.EscortName || '').toLowerCase().includes(searchText) ||
    (escort.ContactNumber || '').toLowerCase().includes(searchText)
  );

  const columns = [
    {
      title: 'S.No',
      key: 'sno',
      render: (text, record, index) => index + 1,  
    },
    {
      title: 'Escort Name',
      dataIndex: 'EscortName',
      key: 'EscortName',
    },
    {
      title: 'Contact Number',
      dataIndex: 'ContactNumber',
      key: 'ContactNumber',
    },
    {
      title: 'Shift',
      dataIndex: 'Shift',
      key: 'Shift',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" className="edit-button" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger className="delete-button" onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
    {
      title: 'View More',
      key: 'viewMore',
      render: (text, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleEscortDashboard(record)} />
      ),
    }
  ];

  return (
    <div style={{display: 'flex', flexGrow: 1, flexDirection: 'column', padding: '30px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddEscort}>
          Add Escort +
        </Button>
        <Input
          placeholder="Search Escorts"
          prefix={<SearchOutlined />}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      
      {filteredEscorts.length === 0 ? (
        <div>No escort details available.</div>
      ) : (
        <Table
          dataSource={filteredEscorts}
          columns={columns}
          rowKey="EscortId" 
          pagination={{ pageSize: 7 }}
        />
      )}

<Modal
  title="Edit Escort"
  visible={isModalVisible}
  onOk={handleSave}
  onCancel={() => setIsModalVisible(false)}
  width={800}
  style={{marginRight:'150px'}}
>
  <Form layout="vertical" className="escort-form">
    <div className="form-grid">
      <Form.Item label="Escort Name">
        <Input
          value={editingEscort?.EscortName}
          onChange={e => setEditingEscort({ ...editingEscort, EscortName: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Contact Number">
        <Input
          value={editingEscort?.ContactNumber}
          onChange={e => setEditingEscort({ ...editingEscort, ContactNumber: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Age">
        <Input
          value={editingEscort?.Age}
          onChange={e => setEditingEscort({ ...editingEscort, Age: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Address">
        <Input
          value={editingEscort?.Address}
          onChange={e => setEditingEscort({ ...editingEscort, Address: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Account Handler Name">
        <Input
          value={editingEscort?.AccountHandlerName}
          onChange={e => setEditingEscort({ ...editingEscort, AccountHandlerName: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Account Number">
        <Input
          value={editingEscort?.AccountNumber}
          onChange={e => setEditingEscort({ ...editingEscort, AccountNumber: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Bank Name">
        <Input
          value={editingEscort?.BankName}
          onChange={e => setEditingEscort({ ...editingEscort, BankName: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Branch Name">
        <Input
          value={editingEscort?.BranchName}
          onChange={e => setEditingEscort({ ...editingEscort, BranchName: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="IFSC Code">
        <Input
          value={editingEscort?.IFSCCode}
          onChange={e => setEditingEscort({ ...editingEscort, IFSCCode: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Shift">
        <Input
          value={editingEscort?.Shift}
          onChange={e => setEditingEscort({ ...editingEscort, Shift: e.target.value })}
        />
      </Form.Item>
    </div>
  </Form>
</Modal>


    </div>
  );
};

export default ViewEscort;

