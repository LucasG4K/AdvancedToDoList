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

interface IMyAppBarProps {
    name: string,
}

const MyAppBar: React.FC<IMyAppBarProps> = ({ name }) => {
    const navigate = useNavigate();
    const logout = () => Meteor.logout(() => navigate('/', { replace: true }));

    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () => setOpenDrawer(!openDrawer);

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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Olá, {name}
                    </Typography>
                    <Button sx={{ color: 'black' }} onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export { MyAppBar }