import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { HomeOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { MiniProfile } from './miniProfile';
import { useUser } from '/imports/providers/userProvider';

interface IMyAppBarProps {
    title: string,
}

const MyAppBar: React.FC<IMyAppBarProps> = ({ title }) => {
    const { user, clearUser } = useUser();
    const navigate = useNavigate();
    const logout = () => {
        Meteor.logout(
            () => {
                navigate('/', { replace: true });
                clearUser();
            }
        );
    }

    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () => setOpenDrawer(!openDrawer);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <MiniProfile user={user!} />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/profile', { replace: true })}>
                        <AccountCircleOutlined />
                        <ListItemText primary="Perfil" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/', { replace: true })}>
                        <HomeOutlined />
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    );

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '12px' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'black' }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={openDrawer} onClose={toggleDrawer}>
                        {DrawerList}
                    </Drawer>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button sx={{ color: 'black' }} onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export { MyAppBar }