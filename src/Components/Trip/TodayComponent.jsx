import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TodayComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDetailedView, setIsDetailedView] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleView = () => {
    setIsDetailedView(!isDetailedView);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      border={0}
      borderRadius={2}
      borderColor="lightgray"
      style={{ borderRadius: '20px' ,width:'800px'}}
    >
    
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle2">Today</Typography>
        <Typography variant="h6">
          {currentDate.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Typography>
      </Box>

     
      {/* <Box
        display="flex"
        alignItems="center"
        sx={{ backgroundColor: '#f5eaff', borderRadius: '20px', padding: '8px 12px' }}
      >
        <Typography variant="body2" sx={{ marginRight: '10px' }}>
          Detailed View
        </Typography>
        <Switch
          checked={isDetailedView}
          onChange={toggleView}
          sx={{ '& .MuiSwitch-thumb': { backgroundColor: 'gray' } }}
        />
      </Box> */}

     
      {/* <Button
        variant="contained"
        startIcon={<CheckCircleOutlined />}
        sx={{
          backgroundColor: '#00C16E',
          borderRadius: '20px',
          textTransform: 'none',
          padding: '6px 16px',
        }}
      >
        Approved
      </Button> */}

     
      {/* <Button
        variant="contained"
        startIcon={<DownloadOutlined />}
        sx={{
          backgroundColor: '#009DFF',
          borderRadius: '20px',
          textTransform: 'none',
          padding: '6px 16px',
        }}
      >
        Download PDF
      </Button> */}
    </Box>
  );
};

export default TodayComponent;
