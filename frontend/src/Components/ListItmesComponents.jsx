import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiListItem from "@mui/material/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListElement from './ListElement';
import { makeStyles,withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
const useStyle = makeStyles({
    ListItmsTextColor:{
        color:"#cbd5e1"
    },
})

const ListItems = withStyles({
    "&:hover": {
        backgroundColor: "blue",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      }

})(MuiListItem)
export default function ListItmesComponents() {
let listItems = ListElement();
const classes = useStyle();
const nevigate = useNavigate();
  return (
    <div className='List_of_itm'>
        <List>
        {listItems.map((text,id) => (
            <ListItem
              button
              key={text}
              className ={classes.lstItms}
              onClick ={()=> nevigate(text.path)}
            >
              <ListItemIcon> {text.icon}</ListItemIcon>
              <ListItemText primary={text.text} className={classes.ListItmsTextColor} />
            </ListItem>
          ))}
        
        </List>
    </div>
  )
}
