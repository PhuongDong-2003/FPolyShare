import { Box, Stack } from '@mui/material'
import React from 'react'
import Notification from './Notification';
import Account from './Account';
import UploadVideo from './UploadVideo';

const PersonalSection = () => {
  return (
    <Box component={"div"}>
      <Stack direction={'row'} spacing={3}>
        <Notification />
        <UploadVideo />
        <Account />
      </Stack>
    </Box>
  )
}

export default PersonalSection;