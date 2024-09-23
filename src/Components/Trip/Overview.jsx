import { UserOutlined } from '@ant-design/icons';
import { Flag, LocationOn } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { Avatar } from 'antd';
import React from 'react';

const OverView = () => {
  const users = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFdQXQpPoqMNsRx-bjee42T5b_GOQC7OrVCKp6Z3G_aRoaspIfK4wqFzLp3XGwePBaSN4&usqp=CAU', name: 'User 1' },
    { src: 'https://img.freepik.com/premium-photo/memoji-handsome-asian-guy-chinese-man-white-background-emoji-cartoon-character_826801-7428.jpg', name: 'User 2' },
    { src: 'https://i.pinimg.com/736x/33/88/ac/3388ac8d16bea4eb7cbb63642385fdda.jpg', name: 'User 3' },
    { src: 'https://i.pinimg.com/474x/88/34/10/883410e9042efb199cc73b4c6ec27272.jpg', name: 'User 4' },
  ];

  return (
    <Box 
    // display="flex"
    //   justifyContent="space-around"
      alignItems="center"
    //   p={2}
      gap={1}
      border={0}
      borderRadius={2}
      width={250}
      borderColor="lightgray"
      style={{padding:'20px 20px', borderRadius: '20px', backgroundColor: '#F6FBFF' }}>
      {/* Start Location */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LocationOn sx={{ color: 'blue' }} />
        <Typography  sx={{color:'grey'}} variant='body3'>Start Location</Typography>
        
      </Box>
      <Box sx={{borderLeft:'3px dotted lightgray',marginLeft:'12.5px'}}>
      <Box sx={{ display: 'flex',marginLeft:'22px', alignItems: 'center', gap: '8px',fontSize:'15px' }}>
      <Typography variant="body3" >
          3495 Oberbrunner, Locks New Lauraport, Saint Barthelemy 68350-4253
        </Typography>
      </Box>
      {/* Date and Time */}
      <Typography  color="grey" sx={{ marginTop: '8px',marginLeft:'22px' ,fontSize:'12px'}}>
        01/01/2022. 6:30 a.m.
      </Typography>
      <Box/>
      {/* Avatars */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px', marginLeft:'20px' }}>
        {users.map((user, index) => (
          <Avatar key={index} src={user.src} icon={<UserOutlined />} size="large" style={{ marginRight: '-10px' }} />
        ))}
      </Box>
      </Box>
      

      <Divider style={{ margin: '8px 0' }} />

      {/* End Location */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Flag sx={{ color: 'red' }} />
        <Typography sx={{color:'grey'}} variant="body3">End Location</Typography>
      </Box>
    </Box>
  );
};

export default OverView;
