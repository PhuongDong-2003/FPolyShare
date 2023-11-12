import { styled } from '@mui/material'
import React from 'react'
import { appbarHeight, drawerWidth } from '../../utils/consts'
import { Outlet } from 'react-router-dom'

const Main = styled('div')(({ theme, drawerOpen }) => ({
  marginTop: appbarHeight,
  padding: theme.spacing(2),
  // backgroundColor: "#EEF2F6",
  position: "relative",
  minHeight: `calc(100vh - ${appbarHeight}px)`,
  transition: theme.transitions.create(
    'margin',
    drawerOpen
    ? {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }
    : {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: drawerOpen ? 0 : -(drawerWidth - Number.parseInt(theme.spacing(3))),
    marginRight: theme.spacing(3),
    width: `100%`,
  },
  [theme.breakpoints.down('md')]: {
    width: "100%",
    padding: theme.spacing(1.5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}))

const Content = ({drawerOpen}) => {
  return (
    <Main drawerOpen={drawerOpen}>
      <Outlet />
    </Main>
  )
}

export default Content