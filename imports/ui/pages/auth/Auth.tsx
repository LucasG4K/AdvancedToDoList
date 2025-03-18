import React, { ChangeEvent, useState } from 'react';
import { Avatar, Box, Button, Container, Link, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { HttpsOutlined, PersonAddAltOutlined } from '@mui/icons-material';
import { colors } from '../../themes/defaultTheme';
import { useUser } from '/imports/providers/userProvider';


export const Auth = () => {

    const { handleLogin, handleSignUp, userForm, setUserForm, handleChangeUserForm } = useUser()

    const [isLogin, setIsLogin] = useState<Boolean>(true);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const validate = (): { [key: string]: string } => {
        const errors: { [key: string]: string } = {};

        // Validação de email (regex simples)
        const emailRegex = /^(.+)@[\w]+\.\w+$/;
        if (!emailRegex.test(userForm.email)) {
            errors.email = 'Email inválido.';
        }

        // Validação de senha (mínimo 6 caracteres)
        if (!isLogin && password.length < 6) {
            errors.password = 'A senha deve ter pelo menos 6 caracteres.';
        }

        // Validação de confirmação de senha
        if (!isLogin && password !== confirmPassword) {
            errors.confirmPassword = 'As senhas não coincidem.';
        }

        // Validação de nome (obrigatório no cadastro)
        if (!isLogin && !userForm.profile.name) {
            errors.name = 'O nome é obrigatório.';
        }

        // Validação de nascimento (opcional, mas você pode adicionar algum critério)
        if (!isLogin && !userForm.profile.birthDate) {
            errors.birthDate = 'A data de nascimento é obrigatória.';
        }

        // Validação de empresa (obrigatório no cadastro)
        if (!isLogin && !userForm.profile.company) {
            errors.company = 'A empresa é obrigatória.';
        }

        // Validação de gênero (obrigatório no cadastro)
        if (!isLogin && userForm.profile.gender === 'other') {
            errors.gender = 'Selecione um gênero.';
        }

        return errors;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validate();

        // Se houver erros, mostrar na interface e impedir o envio do formulário
        if (Object.keys(validationErrors).length > 0) {
            // Exibir os erros como mensagem
            for (const error in validationErrors) {
                alert(validationErrors[error]);
            }
            return;
        }

        if (isLogin) {
            try {
                await handleLogin(userForm.email, password);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }
        } else {
            try {
                await handleSignUp(userForm, password);
                await handleLogin(userForm.email, password);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }
        }

        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <Container maxWidth="xs">
                <Paper elevation={10} sx={{ mt: 2, mb: 2, p: 2, height: 'vh' }}>
                    <Avatar sx={{ mx: 'auto', bgcolor: colors.primary, textAlign: 'center', mb: 1 }}>
                        {isLogin ? <HttpsOutlined /> : <PersonAddAltOutlined />}
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        {/* NOME */}
                        {!isLogin && (
                            <TextField
                                error={!!validate().name}
                                helperText={validate().name || ''}
                                label="Nome"
                                name="name"
                                fullWidth
                                required
                                value={userForm.profile.name}
                                onChange={handleChangeUserForm}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* EMAIL */}
                        <TextField
                            error={!!validate().email}
                            helperText={validate().email || ''}
                            label="Email"
                            name="email"
                            fullWidth
                            required
                            value={userForm.email}
                            onChange={handleChangeUserForm}
                            sx={{ mb: 2 }}
                        />

                        {/* SENHA */}
                        <TextField
                            error={!!validate().password}
                            helperText={validate().password || ''}
                            type="password"
                            label="Senha"
                            name="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            sx={{ mb: 2 }}
                        />

                        {/* CONFIRMAR SENHA */}
                        {!isLogin && (
                            <TextField
                                error={!!validate().confirmPassword}
                                helperText={validate().confirmPassword || ''}
                                type="password"
                                label="Confirmar Senha"
                                name="confirmPassword"
                                fullWidth
                                required
                                value={confirmPassword}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* DATA DE NASCIMENTO */}
                        {!isLogin && (
                            <TextField
                                error={!!validate().birthDate}
                                helperText={validate().birthDate || ''}
                                label="Data de Nascimento"
                                name="birthDate"
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                value={userForm.profile.birthDate ? userForm.profile.birthDate.toISOString().split('T')[0] : null} // Formato YYYY-MM-DD
                                onChange={(e) => setUserForm({ ...userForm, profile: { ...userForm.profile, birthDate: new Date(e.target.value) } })}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* EMPRESA */}
                        {!isLogin && (
                            <TextField
                                error={!!validate().company}
                                helperText={validate().company || ''}
                                label="Empresa"
                                name="company"
                                fullWidth
                                required
                                value={userForm.profile.company}
                                onChange={handleChangeUserForm}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* GÊNERO */}
                        {!isLogin && (
                            <TextField
                                error={!!validate().gender}
                                helperText={validate().gender || ''}
                                select
                                label="Gênero"
                                name="gender"
                                fullWidth
                                required
                                value={userForm.profile.gender}
                                onChange={handleChangeUserForm}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="male">Masculino</MenuItem>
                                <MenuItem value="female">Feminino</MenuItem>
                                <MenuItem value="other">Outro</MenuItem>
                            </TextField>
                        )}

                        {/* BOTÃO DE SUBMIT */}
                        <Button
                            type="submit"
                            disabled={false}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            {isLogin ? 'Entrar' : 'Cadastrar'}
                        </Button>
                    </Box>

                    <Link
                        sx={
                            {
                                mt: 1,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                ml: 'auto',
                                "&:hover": { cursor: 'pointer' }
                            }
                        }
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {!isLogin ? 'Entrar' : 'Cadastrar'}
                    </Link>
                </Paper>
            </Container >
        </div >
    );
}