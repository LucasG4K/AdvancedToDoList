import React, { ChangeEvent, useState } from 'react';
import { Avatar, Box, Button, Container, Link, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { HttpsOutlined, PersonAddAltOutlined } from '@mui/icons-material';
import { Colors } from './theme';
import { User } from '/imports/api/user/UserTypes';
import { Meteor } from 'meteor/meteor';


export const Auth = () => {

    const [isLoggin, setIsLoggin] = useState<Boolean>(true);
    const color: Colors = new Colors;

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [userData, setUserData] = useState<User>({
        _id: '',
        email: '',
        profile: {
            name: '',
            gender: 'other',
            avatar: '',
            industry: '',
        },
        createdAt: new Date(),
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name in userData.profile) {
            setUserData({
                ...userData,
                profile: {
                    ...userData.profile,
                    [event.target.name]: event.target.value
                }
            })
        } else {
            setUserData({
                ...userData,
                [event.target.name]: event.target.value
            });
        }
    }

    const validate = () => { return true; }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoggin) {
            if (!validate()) return;

            Meteor.loginWithPassword(userData.email, password);
        } else {
            if (!validate()) return;

            await Meteor.callAsync('user.create', {
                userData: userData,
                password: password
            });
        }
    };

    return (
        <div>
            <Container maxWidth='xs' >
                <Paper elevation={10} sx={{ mt: 8, p: 2 }}> {/*mt=margin top, p=padding  ->   multiplicados por 8 em relação ao CSS*/}
                    <Avatar sx={{ mx: 'auto', bgcolor: color.primary, textAlign: 'center', mb: 1 }} >
                        {isLoggin ? <HttpsOutlined /> : <PersonAddAltOutlined />}
                    </Avatar>
                    <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }} >
                        {isLoggin ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        {!isLoggin && <TextField label='Name' fullWidth required sx={{ mb: 2 }} />}

                        <TextField label='Email' fullWidth required sx={{ mb: 2 }} />

                        {!isLoggin && <TextField type='date' label='Birthdate' fullWidth required sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />}

                        {!isLoggin && (
                            <TextField
                                select
                                label="Gender"
                                name="gender"
                                value={userData.profile.gender || "male"}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            >
                                {["female", "male", "other"].map((op) => (
                                    <MenuItem key={op} value={op}>
                                        {op}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}

                        {!isLoggin && <TextField label='Company' fullWidth sx={{ mb: 2 }} />}

                        <TextField type='password' label='Password' fullWidth required sx={{ mb: 2 }} />

                        {!isLoggin && <TextField type='password' label='Confirm Password' fullWidth required sx={{ mb: 2, outlineColor: color.terciary }} />}

                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>{isLoggin ? 'Sign In' : 'Sign Up'}</Button>
                    </Box>
                    <Link onClick={() => setIsLoggin(!isLoggin) } sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', ml: 'auto', "&:hover": { cursor: 'pointer' } }}>
                        {isLoggin ? 'Sign Up' : 'Sign In'}
                    </Link>
                </Paper>
            </Container>
        </div>
    );
}