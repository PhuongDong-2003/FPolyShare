import { useState } from 'react';
import { Box, IconButton, Typography, useTheme} from "@mui/material"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens} from "../../theme";
// Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
//import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Item = ({icon, title, to, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <MenuItem 
            active={selected===title} style={{color: colors.grey[100]}}
            onClick={()=> setSelected(title)} icon={icon}>
                <Typography>{title}</Typography>
                <Link to={to}/>
        </MenuItem>
    )
}

export const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return(
        <Box 
        sx={{
            "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
            color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
            color: "#6870fa !important",
            },
            height:"100vh"
        }}
        >
            <ProSidebar collapsed = {isCollapsed}>
                <Menu iconShape="square">

                    {/* MENU ICON & LOGO */}
                    <MenuItem onClick={()=>setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed &&(
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <IconButton onClick={()=> setIsCollapsed(!isCollapsed)}>
                                    <CloseOutlinedIcon/>
                                </IconButton>
                                <img style={{width: '130px'}}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/FPT_Polytechnic.png/640px-FPT_Polytechnic.png"
                                    alt='logo'
                                    className='header-logo'
                                />
                            </Box>
                        )}
                    </MenuItem>

                    {/* INFO ACCOUNT */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            {/* IMG USER */}
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img 
                                    src={`../../assets/user.png`}
                                    alt='img_user'
                                    width="100"
                                    height="100px"
                                    style={{borderRadius: "50%", cursor:"pointer"}}
                                />
                            </Box>
                            {/* NAME & ROLE */}
                            <Box textAlign="center">
                                <Typography 
                                    variant="h3" 
                                    color={colors.grey[100]} 
                                    fontWeight="bold"
                                    sx={{m:"10px 0 0 0"}}>
                                    Name Account
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}>
                                    Administrator
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* ITEMS MENU */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Khái quát"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography variant="h6" color={colors.grey[300]} sx={{m:'15px 0 5px 20px'}}>
                            Dữ liệu
                        </Typography>
                        <Item
                            title="Quản trị"
                            to="/list"
                            icon={<PeopleOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {!isCollapsed&&(
                            <Box sx={{marginLeft:"20px"}}>
                            <Item
                                title="Giảng viên"
                                to="/mentors"
                                icon={<AccountCircleOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Sinh viên"
                                to="/students"
                                icon={<Groups2OutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Box>
                        )}
                        <Item
                                title="Thêm mới"
                                to="/form"
                                icon={<PersonAddAltIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        > Report </Typography>
                        <Item
                            title="Báo cáo thống kê"
                            to="/chart"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}