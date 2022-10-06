import HomeIcon from '@mui/icons-material/Home';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GridViewIcon from '@mui/icons-material/GridView';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaymentsIcon from '@mui/icons-material/Payments';
import TuneIcon from '@mui/icons-material/Tune';

const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon className='listColor' />,
      path: "/UserHome/Home",
    },
    {
      text: "Orders",
      icon: <FilterFramesIcon className='listColor' />,
      path: "/UserHome/Orders",
    },
    {
      text: "Delivery",
      icon: <LocalShippingIcon className='listColor' />,
      path: "/UserHome/Delivery",
    },
    {
      text: "Products",
      icon: <GridViewIcon className='listColor' />,
      path: "/UserHome/Products",
    },
    {
        text: "Analytics",
        icon: <AnalyticsIcon className='listColor' />,
        path: "/UserHome/Analytics",
      },{
        text: "Payments",
        icon: <PaymentsIcon className='listColor' />,
        path: "/UserHome/Payments",
      },
      {
        text: "Customers",
        icon: <TuneIcon className='listColor' />,
        path: "/UserHome/Customers",
      },
  ];

function ListElement(){
    return menuItems
}

export default ListElement