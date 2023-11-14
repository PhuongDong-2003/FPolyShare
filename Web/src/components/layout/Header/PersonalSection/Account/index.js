import { Avatar, ButtonBase, ClickAwayListener, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, useTheme } from "@mui/material";
import React, { Fragment, useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Account = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenAnchor = Boolean(anchorEl);
  const handleOpenAnchor = (event) => setAnchorEl(event.currentTarget);
  const handleCloseAnchor = () => setAnchorEl(null);

  return (
    <Fragment>
      <ButtonBase
        id="basic-button"
        aria-controls={isOpenAnchor ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpenAnchor ? 'true' : undefined}
        onClick={handleOpenAnchor}
        sx={{ overflow: "hidden" }}
      >
        <Avatar
          variant="rounded"
          src='https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80' 
          sx={{
            transition: "all .2s ease-in-out",
            background: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            "&:hover": {
              background: theme.palette.primary.dark,
              color: theme.palette.primary.light,
            },
          }}
        />
      </ButtonBase>      
      <Popper
        open={isOpenAnchor}
        anchorEl={anchorEl}
        placement="bottom-end"
        sx={{ zIndex: 9999 }}
      >
        <Paper elevation={5}>
          <ClickAwayListener onClickAway={handleCloseAnchor}>
            <List sx={{ minWidth: 250 }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Tài khoản của tôi</ListItemText>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <HelpOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Trợ giúp</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ExitToAppOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Đăng xuất</ListItemText>
              </ListItemButton>
            </List>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Fragment>
  );
};

export default Account;
