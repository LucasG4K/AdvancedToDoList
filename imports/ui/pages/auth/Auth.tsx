import React, { ChangeEvent, useState } from 'react';
import { Avatar, Box, Button, Container, Link, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { HttpsOutlined, PersonAddAltOutlined } from '@mui/icons-material';
import { colors } from '../../themes/defaultTheme';
import { useUser } from '/imports/providers/userProvider';


export const Auth = () => {

    const { handleLogin, handleSignUp, userForm, setUserForm, handleChangeUserForm, clearUser } = useUser()

    const [isLogin, setIsLogin] = useState<boolean>(true);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [userFormError, setUserFormError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        name: "",
        birthDate: "",
    });

    const emailRegex = /^(.+)@[\w]+\.\w+$/;

    React.useEffect(() => {
        const genderOptions = ['male', 'female', 'other']; // Gêneros válidos
        setUserFormError({
            email: userForm.email === "" || emailRegex.test(userForm.email) ? "" : "E-mail inválido",
            password: password === "" || password.length >= 6 ? "" : "A senha deve ter pelo menos 6 caracteres",
            confirmPassword: confirmPassword === "" || confirmPassword === password ? "" : "As senhas não coincidem",
            name: userForm.profile.name === "" || userForm.profile.name.length > 2 ? "" : "O nome deve ter pelo menos 3 caracteres",
            birthDate: userForm.profile.birthDate === "" || userForm.profile.birthDate <= new Date() ? "" : "Data inválida",
            gender: userForm.profile.gender === "" || genderOptions.includes(userForm.profile.gender) ? "" : "Gênero não atribuído", // Validação do gênero
        });
    }, [userForm, password, confirmPassword]); // O efeito será executado sempre que o userForm mudar


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verifica se existem erros no formulário
        const validationErrors = userFormError;

        // Coletando erros para exibir
        const errors = Object.values(validationErrors).filter(error => error !== "");

        if (errors.length > 0) {
            console.log(errors)
            // Se houver erros, mostrar uma mensagem amigável
            const errorMessage = errors.join("\n"); // Junta todos os erros em uma string separada por novas linhas
            alert(`Por favor, corrija os seguintes erros:\n${errorMessage}`);
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
                                error={!!userFormError.name}
                                helperText={userFormError.name}
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
                            error={!!userFormError.email}
                            helperText={userFormError.email}
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
                            error={!!userFormError.password}
                            helperText={userFormError.password}
                            type="password"
                            label="Senha"
                            name="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value.trim())}
                            sx={{ mb: 2 }}
                        />

                        {/* CONFIRMAR SENHA */}
                        {!isLogin && (
                            <TextField
                                error={!!userFormError.confirmPassword}
                                helperText={userFormError.confirmPassword}
                                type="password"
                                label="Confirmar Senha"
                                name="confirmPassword"
                                fullWidth
                                required
                                value={confirmPassword}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value.trim())}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* DATA DE NASCIMENTO */}
                        {!isLogin && (
                            <TextField
                                error={!!userFormError.birthDate}
                                helperText={userFormError.birthDate}
                                label="Data de Nascimento"
                                name="birthDate"
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                value={userForm.profile.birthDate ? userForm.profile.birthDate.toISOString().split('T')[0] : ''} // Formato YYYY-MM-DD
                                onChange={(e) => setUserForm({ ...userForm, profile: { ...userForm.profile, birthDate: new Date(e.target.value) } })}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* GÊNERO */}
                        {!isLogin && (
                            <TextField
                                error={!!userFormError.gender}
                                helperText={userFormError.gender}
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
                        onClick={() => {
                            setIsLogin(!isLogin);
                            clearUser();
                            setPassword('');
                            setConfirmPassword('');
                        }}
                    >
                        {!isLogin ? 'Entrar' : 'Cadastrar'}
                    </Link>
                </Paper>
            </Container >
        </div >
    );
}