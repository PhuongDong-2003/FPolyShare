import { Box, InputBase, alpha, styled } from '@mui/material';
import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = styled('div')(({ theme }) => ({
  position: "relative",
  borderRadius: "0.5rem",
  marginRight: "1rem",
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const InputBaseStyle = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: "100%",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4.5)})`,
    transition: theme.transitions.create('width', { duration: 400 }),
  },
}))

const SearchSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper><SearchOutlinedIcon /></SearchIconWrapper>
        <InputBaseStyle />
      </Search>
    </Box>
  );
}

export default SearchSection;