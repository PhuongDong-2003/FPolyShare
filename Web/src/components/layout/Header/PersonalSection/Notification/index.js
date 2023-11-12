import { Avatar, Badge, Box, ClickAwayListener, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Popper, Typography, styled, useTheme } from "@mui/material";
import React, { Fragment, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useGetNotificationsQuery } from "../../../../../services/feature/Notification/service";
import { formatDateOrString } from "../../../../../utils/format";

const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.grey[200]
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const Notification = () => {
  const theme = useTheme();
  const { data: notifications = [] } = useGetNotificationsQuery();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenAnchor = Boolean(anchorEl);
  const handleOpenAnchor = (event) => setAnchorEl(event.currentTarget);
  const handleCloseAnchor = () => setAnchorEl(null);

  return (
    <Fragment>
      <IconButton size="medium" onClick={handleOpenAnchor}>
        <Badge badgeContent={notifications.length} color="error" max={5}>
          <NotificationsNoneIcon fontSize="medium" />
        </Badge>
      </IconButton>

      {isOpenAnchor && (
        <Popper
          open={isOpenAnchor}
          anchorEl={anchorEl}
          placement="auto-end"
          sx={{ zIndex: 9999, margin: "10px 0 !important" }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <ClickAwayListener onClickAway={handleCloseAnchor}>
              <Box>
                <Typography variant="subtitle1" component={"h6"} p={2}>Thông báo</Typography>
                <Divider />
                <List
                  sx={{
                    py: 0,
                    width: '100%',
                    minWidth: 400,
                    maxHeight: 500,
                    overflow: 'auto',
                    [theme.breakpoints.down('md')]: {
                      maxWidth: 300
                    },
                    '& .MuiListItemSecondaryAction-root': {
                      top: 22
                    },
                    '& .MuiDivider-root': {
                      my: 0
                    },
                    '& .list-container': {
                      pl: 7
                    }
                  }}
                >
                  { notifications.map((notification, index) => (
                    <ListItemWrapper key={index}>
                      <ListItem alignItems="center">
                        <ListItemAvatar>
                          <Avatar alt="avatar" src={notification.image} />
                        </ListItemAvatar>
                        <ListItemText primary={notification.sender} />
                        <ListItemSecondaryAction>
                          <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                              <Typography variant="caption" display="block" gutterBottom>{formatDateOrString(notification.createDate)}</Typography>
                            </Grid>
                          </Grid>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Grid container direction="column" className="list-container">
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" component={'p'}>{notification.content}</Typography>
                        </Grid>
                      </Grid>
                      { index !== notifications.length - 1 && ( <Divider /> )}
                    </ListItemWrapper>   
                  )) }
                </List>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Popper>
      )}
    </Fragment>
  );
};

export default Notification;
