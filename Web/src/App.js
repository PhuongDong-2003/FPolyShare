import "./App.css";
import React from "react";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import { Box } from "@mui/material";
import Header from "./components/layout/Header/index";
import Content from "./components/layout";
import { ToastContainer } from "react-toastify";

const App = () => {
  // const theme = useTheme();  
  // const matchDown = useMediaQuery(theme.breakpoints.down("md"))  

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <Header drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle}/>

      {/* Sidebar */}
      <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle}/>

      {/* Main */}
      <Content drawerOpen={drawerOpen} />

      <ToastContainer />
    </Box>
  );
}

export default App;
