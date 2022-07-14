import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function DrawerItem(props) {
  return (
    <Link to={props.url} className={'Link'}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {props.icon}
          </ListItemIcon>
          <ListItemText primary={props.text} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}