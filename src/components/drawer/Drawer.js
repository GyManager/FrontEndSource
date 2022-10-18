import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
    Box, CssBaseline, Divider, Drawer, IconButton, List, Stack,
    Typography, Toolbar, ListItemButton, ListItemIcon, ListItem, ListItemText, Avatar
} from '@mui/material/';

import MuiAppBar from '@mui/material/AppBar';

import {
    AdminPanelSettings, ChevronLeft, ChevronRight, FitnessCenter, Home, Mail, Menu,
    Logout, Person, ListAlt, WindowSharp, Lock, FolderCopy
} from '@mui/icons-material';

import DrawerItem from './DrawerItem';

import { animateScroll as scroll} from 'react-scroll';

import AuthService from '../../services/auth.service'

import logo from '../../images/logo.png'

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
        await AuthService.logout();
        setTimeout(() => { navigate('/login') }, 100)
    }

    const handleWheel = (e) => {
        scroll.scrollMore(-1);
    }

    const menuItem = [
        {
            text: "Inicio",
            icon: <Home />,
            url: "/",
            permiso: ""
        },
        {
            text: "Mis Planes",
            icon: <Mail />,
            url: "/mis-planes",
            permiso: "mis-planes"
        },
        {
            text: "Historico Planes",
            icon: <FolderCopy/>,
            url: "/historico-planes",
            permiso: "mis-planes"
        },
        {
            text: "Clientes",
            icon: <Person />,
            url: "/clientes",
            permiso: "gestion-clientes"
        },
        {
            text: "Ejercicios",
            icon: <FitnessCenter />,
            url: "/ejercicios",
            permiso: "gestion-ejercicios"
        },
        {
            text: "Micro Planes",
            icon: <ListAlt />,
            url: "/micro-planes",
            permiso: "gestion-micro-planes"
        },
        {
            text: "Usuarios",
            icon: <AdminPanelSettings />,
            url: "/usuarios",
            permiso: "gestion-usuarios"
        },
        {
            text: "Cambiar Contraseña",
            icon: <Lock/>,
            url: "/password",
            permiso: ""
        }
    ]

    return (
        <Box sx={{ display: 'flex', height: '9.5vh' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{backgroundColor: 'navbar.main'}}>
                <Stack direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Toolbar>
                        {showMenu &&
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <Menu />
                            </IconButton>
                        }
                    </Toolbar>
                    <Avatar alt="Logo" src={logo} width={42} height={42} sx={{mr:2}}/>
                </Stack>
            </AppBar>
            {showMenu && <div><Drawer
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
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItem.filter((object) =>
                        token.permisos.includes(object.permiso) || object.permiso == "")
                        .map((object) => (
                            <DrawerItem
                                key={object.text}
                                {...object}
                                handleDrawerClose={handleDrawerClose}
                            />
                        ))}
                    <Divider />
                    <ListItem disablePadding onClick={handleLogout}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            <ListItemText primary={"Cerrar sesion"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            </div>
            }
            <Main open={open}>
                <DrawerHeader />
            </Main>
            {open &&
                <Box id='closebox'
                    sx={{
                        backgroundColor: '#000000',
                        opacity: '0.5',
                        width: '100vw',
                        height: '300vh',
                        zIndex: '255',
                        position: 'absolute',
                        left: '0vw',

                    }}
                    onClick={handleDrawerClose}
                    onWheel={handleWheel}
                ></Box>
            }
        </Box>
    );
}