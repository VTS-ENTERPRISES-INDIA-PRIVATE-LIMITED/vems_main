import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

const TripCard = () => {
  return (
    <>
    <Box
      display="flex"
   
      alignItems="center"
  
      gap={1}
      border={0}
      borderRadius={2}
      borderColor="lightgray"
      style={{padding:'5px 20px' ,borderRadius: '20px', backgroundColor: '#F6FBFF' }}
    >
     
      <Box display="flex"  justifyContent="center" alignItems="center" sx={{ backgroundColor: '#DFF5FA', borderRadius: '15px', padding: '5px' }}>
        <Avatar alt="Car" src="https://static.vecteezy.com/system/resources/previews/047/242/709/non_2x/modern-luxury-car-isolated-on-transparent-background-free-png.png" sx={{ width: 60, height: 60 }} />
        <Box ml={0} display="flex" flexDirection="column" alignItems="center"
        justifyContent="center">
          <Typography variant="h7">TN 01 AB 1234</Typography>
          <Typography variant="h7" style={{ fontSize: '12px', color: 'gray' }} color="textSecondary">NOTVEH0123</Typography>
        </Box>
      </Box>

   
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#FFEAEA', borderRadius: '15px', padding: '12px 5px' }}
      >
        <Typography variant="h7" style={{ color: 'red' }}>123456785</Typography>
        <Typography variant="h7" style={{ fontSize: '14px', color: 'gray' }}>Trip ID</Typography>
      </Box>

     
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#FEFEE0', borderRadius: '15px', padding: '12px 5px' }}
      >
        <Typography variant="h7" style={{ color: 'olive' }}>Office</Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Ride Type</Typography>
      </Box>

     
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#E6F9F4', borderRadius: '15px', padding: '12px 5px' }}
      >
        <Typography variant="h7" style={{ color: '#00C16E' }}>₹800</Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Total Fare</Typography>
      </Box> */}

      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#EAF5FA', borderRadius: '15px', padding: '12px 5px' }}
      >
        <Typography variant="h7">48km/h</Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Average Speed</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '12px 5px' }}
      >
        <Typography variant="h7">120km/h <span style={{ fontSize: '12px', color: 'gray' }}>(x12)</span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Max Speed</Typography>
      </Box>
    </Box>
    
    <Box
      display="flex"
    
      alignItems="center"
   
      gap={0.7}
      border={0}
      borderRadius={2}
      borderColor="lightgray"
      style={{padding:'5px 20px' ,borderRadius: '20px', backgroundColor: '#F6FBFF' }}
    >
     
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">120km/h <span style={{ fontSize: '12px', color: 'gray' }}>(x12)</span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Max Speed</Typography>
      </Box> */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '10px' }}
      >
        <Typography variant="h7">1h10m<span style={{ fontSize: '12px', color: 'gray' }}>(x12)</span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Run Time</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">40m <span style={{ fontSize: '12px', color: 'gray' }}>(x12)</span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Idle time</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">32.2Km <span style={{ fontSize: '12px', color: 'gray' }}></span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Travelled</Typography>
      </Box>
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">2<span style={{ fontSize: '12px', color: 'gray' }}>(x12)</span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>No.of Pickup</Typography>
      </Box> */}
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">3 <span style={{ fontSize: '12px', color: 'gray' }}>(x12)</span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>No.of Drops</Typography>
      </Box> */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">4 <span style={{ fontSize: '12px', color: 'gray' }}></span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Employees</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">6:30am<span style={{ fontSize: '12px', color: 'gray' }}></span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>Start Time</Typography>
      </Box>
      <Box
        display="flex"
        ml={0}
        flexDirection="column"M
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '15px', padding: '5px' }}
      >
        <Typography variant="h7">10:30am<span style={{ fontSize: '12px', color: 'gray' }}></span></Typography>
        <Typography variant="h8" style={{ fontSize: '12px', color: 'gray' }}>End Time</Typography>
      </Box>
    </Box>
    {/* <Box
     display="flex"
     //   justifyContent="space-around"
       alignItems="center"
    //    p={2}
       gap={1}
       border={0}
       borderRadius={2}
       borderColor="lightgray"
       style={{padding:'10px 20px', borderRadius: '20px', backgroundColor: '#F6FBFF' }}> */}
    {/* <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f5eaff', borderRadius: '5px', padding: '5px' }}>
        <Box ml={1}>
          <Typography variant="h7">New Pandian Travels</Typography>
          <Typography style={{fontSize:'12px'}}>Assigned Client</Typography>
        </Box>
      </Box> */}

   
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#FEFEE0', borderRadius: '5px', padding: '5px' }}
      >
        <Typography variant="h7" style={{ color: 'orange' }}>NPT-HCL</Typography>
        <Typography style={{fontSize:'12px'}}>Assigned Location</Typography>
      </Box> */}

     
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#F6F7F8', borderRadius: '5px', padding: '5px' }}
      >
        <Typography variant="h7" style={{ color: 'black' }}>Office</Typography>
        <Typography style={{fontSize:'12px'}}>Ride Type</Typography>
      </Box>
    </Box> */}

    
    </>
    
  );
};

export default TripCard;
