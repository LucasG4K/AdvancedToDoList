import React, { ChangeEvent, useState } from 'react';
import { Avatar, Box, Button, Container, Link, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { HttpsOutlined, PersonAddAltOutlined } from '@mui/icons-material';
import { Colors } from '../theme';
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
            gender: 'male',
            birthDate: new Date("2000-01-01"),
            avatar: '',
            company: '',
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

            try {
                const userId = await Meteor.callAsync('user.create', userData, password);
                if (userId)
                    Meteor.loginWithPassword(userData.email, password);

            } catch(e: any) {
                alert(e.message);
            }
        }
        setPassword('');
        setConfirmPassword('');
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

                        {/*NOME*/}
                        {!isLoggin && (
                            <TextField
                                label='Name'
                                name='name'
                                fullWidth
                                required
                                value={userData.profile.name}
                                onChange={handleChange}
                                sx={{ mb: 2 }} />)}

                        {/*EMAIL*/}
                        <TextField
                            label='Email'
                            name='email'
                            fullWidth
                            required
                            value={userData.email}
                            onChange={handleChange}
                            sx={{ mb: 2 }} />

                        {/*DATA NASCIMENTO*/}
                        {!isLoggin && (
                            <TextField
                                type='date'
                                label='Birthdate'
                                name='birthdate'
                                fullWidth
                                required
                                // value={userData.profile.birthDate}
                                // onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputLabelProps={{ shrink: true }} />
                        )}

                        {/*GÊNERO*/}
                        {!isLoggin && (
                            <TextField
                                select
                                label="Gender"
                                name="gender"
                                fullWidth
                                value={userData.profile.gender || "male"}
                                onChange={handleChange}
                                required
                                sx={{ mb: 2 }}
                            > {["female", "male", "other"].map((op) => (
                                <MenuItem key={op} value={op}>
                                    {op.charAt(0).toUpperCase() + op.slice(1)}
                                </MenuItem>
                            ))}
                            </TextField>
                        )}

                        {/*EMPRESA QUE TRABALHA*/}
                        {!isLoggin && (
                            <TextField
                                label='Company'
                                name='company'
                                fullWidth
                                value={userData.profile.company}
                                onChange={handleChange}
                                sx={{ mb: 2 }} />)}

                        {/*SENHA*/}
                        <TextField
                            type='password'
                            label='Password'
                            name='password'
                            fullWidth
                            required
                            value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            sx={{ mb: 2 }} />

                        {/*CONFIRMA SENHA*/}
                        {!isLoggin && (
                            <TextField
                                type='password'
                                label='Confirm Password'
                                name='confirm-password'
                                fullWidth
                                required
                                value={confirmPassword}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                                sx={{ mb: 2, outlineColor: color.terciary }} />)}

                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>{isLoggin ? 'Sign In' : 'Sign Up'}</Button>
                    </Box>
                    <Link onClick={() => setIsLoggin(!isLoggin)} sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', ml: 'auto', "&:hover": { cursor: 'pointer' } }}>
                        {isLoggin ? 'Sign Up' : 'Sign In'}
                    </Link>
                </Paper>
            </Container>
        </div>
    );
}