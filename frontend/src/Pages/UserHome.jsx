import React from 'react'
import ListItmesComponents from '../Components/ListItmesComponents'
import "./UserHome.css"
import {
  Routes,
  Route,
} from "react-router-dom";
import Orders from './Orders';
import Delivery from './Delivery';
import Home from './Home';
import Products from './Products';
import Analytics from './Analytics';
import Payment from './Payment';
import Customers from './Customers';
// export default function () {

//   return (
//     <div className='UserHome'>
//         <div className='LeftBar'>
//             <ListItmesComponents />
//         </div>
//         <div className='RightBar'> 
//         <Routes>
//         <Route path="Home" element={<Home />} />
//       <Route path="Products" element={<Products />} />
//       <Route path="Orders" element={<Orders/>} />
//       <Route path="Delivery" element={<Delivery/>} />
//       <Route path="Analytics" element={<Analytics />} />
//       <Route path="Payments" element={<Payment />} />
//       <Route path="Customers" element={<Customers />} />
//     </Routes>
//         </div>

//     </div>
//   )
// }


import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Productpage from './Productpage';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: '#9c27b0' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Apni Dukaan
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


        <div className='LeftBar'>
          <ListItmesComponents />
        </div>
      </Drawer>
      <div className='RightBar'>
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Products/*" element={<Productpage />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="Delivery" element={<Delivery />} />
            <Route path="Analytics" element={<Analytics />} />
            <Route path="Payments" element={<Payment />} />
            <Route path="Customers" element={<Customers />} />
          </Routes>
        
      </Box>
      </div>
    </Box>
  );
}
