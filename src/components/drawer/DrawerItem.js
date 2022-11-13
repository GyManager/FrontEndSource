import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function DrawerItem(props) {
  return (
    <Link to={props.url} onClick={props.handleDrawerClose} className={'Link'} >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{color: "primary.main"}}>
            {props.icon}
          </ListItemIcon>
          <ListItemText primary={props.text} sx={{color:'black'}}/>
        </ListItemButton>
      </ListItem>
    </Link>
  )
}