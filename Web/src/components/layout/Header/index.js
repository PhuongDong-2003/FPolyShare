import { useTheme } from "@mui/material/styles";
import React from "react";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchSection from "./SearchSection";
import PersonalSection from "./PersonalSection";
import { appbarHeight, drawerWidth } from "../../../utils/consts";
import { useNavigate } from "react-router-dom";

const Header = ({ drawerOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        boxShadow: "unset",
        transition: drawerOpen ? theme.transitions.create("width") : "none",
      }}
    >
      <Toolbar
        sx={{
          [theme.breakpoints.up("xs")]: {
            minHeight: appbarHeight,
          },
        }}
      >
        <Box
          sx={{
            width: drawerWidth - 24,
            display: "flex",
            [theme.breakpoints.down("md")]: {
              width: "auto",
            },
          }}
        >
          <Box
            component={"div"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"90%"}
          >
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Box
              component="span"
              sx={{ display: { xs: "none", md: "block" }, flexGrow: 0.9, cursor: "pointer" }}
              onClick={() => navigate("/home")}
            >
              <Avatar
                alt="avatar"
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                variant="rounded"
                sx={{ width: "100%", overflow: "hidden" }}
              />
            </Box>
          </Box>
        </Box>

        <SearchSection />
        <Box sx={{ flexGrow: 1 }} />

        <PersonalSection />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
