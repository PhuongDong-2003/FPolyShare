import { Box, IconButton, InputBase, Menu, MenuItem, Typography, useTheme} from "@mui/material"
import {tokens, ColorModeContext} from "../../theme";
import { useContext, useState } from "react";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";


export const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // DROP DOWN MENU
    const dropMenuItems = [
        {title: "Tài khoản cá nhân", to:"/profile"},
        {title: "Đổi mật khẩu", to:"/change"},
        {title: "Đăng nhập", to:"/logout"},
    ]
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="10px" width="800px" marginLeft={50}>
                <InputBase sx={{ml:2, flex: 1, fontSize:"20px"}} placeholder="Search..."/>
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon/>
                </IconButton>
            </Box>
            {/* ICON */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark"
                        ?(<DarkModeOutlinedIcon/>)
                        :(<LightModeOutlinedIcon/>)
                    }
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <Box>
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        aria-label="Click để mở rộng"
                        title="Click để mở rộng"
                    >
                        <PersonOutlinedIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {dropMenuItems.map((item) => (
                        <Link to={item.to} 
                        key={item.title} 
                        value={item.title}
                        style={{textDecoration:"none", color:"#868dfb"}}
                        >
                            <MenuItem onClick={handleClose}>
                                <Typography>{item.title}</Typography>
                            </MenuItem>
                        </Link>
                        ))}
                    </Menu>
                </Box>
                {/* <IconButton>
                    <PersonOutlinedIcon />
                </IconButton> */}
            </Box>
        </Box>
    )
}