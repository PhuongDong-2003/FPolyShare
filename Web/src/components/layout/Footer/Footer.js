import { Chip, Stack, Toolbar } from '@mui/material'
import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../../../utils/consts';

// const Search = styled('div')(({ theme }) => ({
//   position: "relative",
//   padding: theme.spacing(0.6),
//   backgroundColor: alpha(theme.palette.common.black, 0.1),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.black, 0.2),
//   },  
//   borderRadius: "20px",
//   [theme.breakpoints.down('sm')]: {
//     width: "auto",
//   },
// }))

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 1.5),
//   height: '100%',
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: "50%",
//   backgroundColor: "#D60909",
//   zIndex: 2,
//   cursor: 'pointer',
//   [theme.breakpoints.down("sm")]: {
//     padding: theme.spacing(0, 0.75),
//   },
// }))

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: "100%",
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width', { duration: 400 }),
//     width: '100%',
//     [theme.breakpoints.down('sm')]: {
//       padding: theme.spacing(0.5, 0),
//       paddingLeft: `calc(1em + ${theme.spacing(2)})`,
//       width: 0,
//       '&:focus': {
//         width: "24ch",
//       },
//     },
//   },
// }))

const tagType = ["HTML/CSS", "AngularJS", "Bootstrap", "Java", "C#", "Spring Boot", "ASP.NET", "JavaScript", "ReactJS", "C/C++"]

function Footer() {
  return (
    <Toolbar sx={{ backgroundColor: "#1DCFFA" }}>
      <Carousel responsive={responsive} infinite={true}>
        <Stack>
          { tagType.map(tag => <Chip key={tag} label={tag} clickable sx={{ px: 2 }}/>) }
        </Stack>
      </Carousel>
    </Toolbar>
  )
}

export default Footer

