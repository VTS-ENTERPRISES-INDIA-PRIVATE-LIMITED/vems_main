import { DownloadOutlined } from '@ant-design/icons';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from 'antd';
import React, { useState } from 'react';
  import SearchIcon from '@mui/icons-material/Search';
const SearchRow = () => {
  const [activeButton, setActiveButton] = useState('Today');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={0}
      border={0}
      borderRadius={2}
      borderColor="lightgray"
      margin
    >
      {/* Search Input with Icon */}
      <TextField
        size="small"
        placeholder="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
          sx: { width: 150, borderRadius: '20px' }, // Rounded corners
        }}
      />

      {/* Buttons instead of Toggle */}
      <Box ml={2} display="flex" gap={1}>
        {['All', 'Today', 'Yesterday', '1 Week', '1 Month'].map((label) => (
          <Button
            key={label}
            variant={activeButton === label ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(label)}
            sx={{
              borderRadius: '20px', // Rounded corners
              textTransform: 'none', // Keep text case normal
              backgroundColor: activeButton === label ? 'lightblue' : 'transparent',
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Date Range Picker (Ant Design) */}
      <DatePicker.RangePicker style={{ marginLeft: 10, borderRadius: '20px' }} />

      {/* Download Button */}
      <Button
        variant="outlined"
        startIcon={<DownloadOutlined />}
        style={{
          borderColor: 'green',
          color: 'green',
          marginLeft: 10,
          borderRadius: '20px', // Rounded corners
        }}
      >
        Download All PDF
      </Button>
    </Box>
  );
};

export default SearchRow;
