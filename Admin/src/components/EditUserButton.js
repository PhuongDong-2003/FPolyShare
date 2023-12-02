// EditUserButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const EditUserButton = ({ userId }) => {
  return (
    <Link to={`/edit-user/${userId}`} style={{ textDecoration: 'none' }}>
      <Button color="success" variant="outlined" >
        Edit
      </Button>
    </Link>
  );
};

export default EditUserButton;
