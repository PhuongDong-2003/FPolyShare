import { Box, Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import TvIcon from '@mui/icons-material/Tv';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import SupportIcon from '@mui/icons-material/Support';
import React, { Fragment, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { appbarHeight, drawerWidth } from "../../../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const items = [
  {
    icon: <HomeIcon />,
    label: "Trang chủ",
    childrenItem: null,
    url: './home',
    role: ["Teacher", "Student"],
  },
  {
    icon: <TvIcon />,
    label: "Dự án của tôi",
    childrenItem: [
      {
        icon: <AccountTreeIcon />,
        label: "Dự án hoạt động",
        url: "./my-videos/active",
      },
      {
        icon: <VideoLibraryIcon />,
        label: "Trạng thái",
        url: "./my-videos/status",
      },
    ],
    role: ["Teacher", "Student"],
  },
  {
    icon: <ListAltOutlinedIcon />,
    label: "Danh sách yêu cầu",
    childrenItem: [
      {
        icon: <PendingActionsOutlinedIcon />,
        label: "Yêu cầu đang chờ",
        url: "./request/latest",
      },
      {
        icon: <RuleOutlinedIcon />,
        label: "Yêu cầu đã xử lý",
        url: "./request/processed",
      },
    ],
    role: ["Teacher"],
  },
  {
    icon: <HistoryOutlinedIcon />,
    label: "Video đã xem",
    childrenItem: null,
    url: './home',
    role: ["Teacher", "Student"],
  },
  {
    icon: <SupportIcon />,
    label: "Hỗ trợ",
    childrenItem: null,
    url: './support',
    role: ["Teacher", "Student"],
  },
]

const NavLinkStyle = styled(NavLink)(() => ({
  color: 'inherit',
  textDecoration: 'none',
}))

const ItemSidebar = ({item, selected}) => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!item.childrenItem) {
      navigate(item.url);
    } else setOpen(!open);
  }

  return (
    <Fragment>
      <ListItemButton key={item.icon} selected={selected} onClick={handleClick} sx={{ py: 2 }}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        { item.childrenItem && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      { item.childrenItem && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            { item.childrenItem.map(children => (
              <ListItemButton 
                key={children.label} 
                selected={selected} 
                onClick={() => navigate(children.url)} 
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{children.icon}</ListItemIcon>
                <ListItemText primary={children.label} />
              </ListItemButton>
            )) }
          </List>
        </Collapse>
      )}
    </Fragment>
  );
}

const Sidebar = ({drawerOpen, handleDrawerToggle}) => {
  const theme = useTheme();
  const matchUp = useMediaQuery(theme.breakpoints.up("md"));
  // const [selected, setSelected] = useState(null);

  // const handleSelected = (item) => setSelected(item);

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={ matchUp ? "persistent" : "temporary" }
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: appbarHeight,
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Box component={"div"}>
          <List>
            { items.map(item => (
              <ItemSidebar
                key={item.label} 
                item={item} 
              />
            ))}
          </List>
        </Box>
      </Drawer>        
    </Box>
  );
};

export default Sidebar;
