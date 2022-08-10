import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
//Todo (Doing) separar el drawer hacer que importe un componente Appbar (ya creado)
// y otro (drawer) (quizas llamar a este archivo navbar) ver componente contenedor del
// curso MUI ya esta implementado.
// import { Box, CssBaseline, Divider, IconButton, List, MenuIcon, MuiAppBar, Stack, Typography, Toolbar } from '@mui/material/';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

import DrawerItem from './DrawerItem';

import AuthService from '../../services/auth.service'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
export default function PersistentDrawerLeft({ showMenu, token }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        // const BorrarStorage = new Promise()

        await AuthService.logout();
        setTimeout(() => { navigate('/login') }, 100)
    }

    const menuItem = [
        {
            text: "Home",
            icon: <HomeIcon />,
            url: "/",
            permiso: ""
        },
        {
            text: "Mis Planes",
            icon: <MailIcon />,
            url: "/mis-planes",
            permiso: "mis-planes"
        },
        {
            text: "Clientes",
            icon: <InboxIcon />,
            url: "/clientes",
            permiso: "gestion-clientes"
        },
        {
            text: "Planes",
            icon: <InboxIcon />,
            url: "/planes",
            permiso: "gestion-planes"
        },
        {
            text: "Mis ejercicios",
            icon: <InboxIcon />,
            url: "/ejercicios",
            permiso: "gestion-ejercicios"
        }
    ]

    return (
        <Box sx={{ display: 'flex', height: '9.5vh' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                    <Toolbar>
                        {showMenu &&
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                        }
                        <Typography variant="h6" noWrap component="div">
                            CorE
                        </Typography>
                    </Toolbar>
                    {showMenu &&
                        <div>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleLogout}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <LogoutIcon />
                            </IconButton>

                        </div>}
                </Stack>
            </AppBar>
            {showMenu && <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItem.filter((object) => token.permisos.includes(object.permiso) || object.permiso == "").map((object) => (
                        <DrawerItem key={object.text} {...object} handleDrawerClose={handleDrawerClose} />
                    ))}
                </List>
                <Divider />
            </Drawer>
            }
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box >
    );
}