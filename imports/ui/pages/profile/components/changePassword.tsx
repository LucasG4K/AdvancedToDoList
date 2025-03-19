import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, TextField } from '@mui/material';
import { useUser } from '/imports/providers/userProvider';
import { MySnackBar } from '/imports/ui/components/mySnackBar';


const ChangePasswordDialog = () => {
    const { handleChangePassword } = useUser();
    const [open, setOpen] = React.useState(false);
    const [popSnackBarUp, setPopSnackBarUp] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setPassword({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        })
        setOpen(false);
    };

    const [password, setPassword] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [passwordFormError, setPasswordFormError] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleChangePasswordForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPassword({
            ...password,
            [name]: value
        });
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = passwordFormError;

        // Coletando erros para exibir
        const errors = Object.values(validationErrors).filter(error => error !== "");

        if (errors.length > 0) {
            console.log(errors)
            // Se houver erros, mostrar uma mensagem amigável
            const errorMessage = errors.join("\n"); // Junta todos os erros em uma string separada por novas linhas
            alert(`Por favor, corrija os seguintes erros:\n${errorMessage}`);
            return;
        }

        try {
            handleChangePassword(password.oldPassword, password.newPassword, handleSuccess);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    React.useEffect(() => {
        setPasswordFormError({
            oldPassword: password.oldPassword === "" || password.oldPassword !== password.newPassword ? "" : "As senhas não devem ser iguais",
            newPassword: password.newPassword === "" || password.newPassword.length >= 6 ? "" : "A nova senha deve ter pelo menos 6 caracteres",
            confirmNewPassword: password.confirmNewPassword === "" || password.confirmNewPassword === password.newPassword ? "" : "As novas senhas não coincidem",
        })
    }, [password]);

    const handleSuccess = () => {
        handleClose();
        setPopSnackBarUp(true);
    }

    return (
        <React.Fragment>
            <Link
                sx={{ ml: 'auto', "&:hover": { cursor: 'pointer' } }}
                onClick={handleClickOpen}
            >
                Alterar Senha
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit
                    },
                }}
            >
                <DialogTitle>Alterar Senha</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        error={!!passwordFormError.oldPassword}
                        helperText={passwordFormError.oldPassword}
                        value={password.oldPassword}
                        onChange={handleChangePasswordForm}
                        margin="dense"
                        name="oldPassword"
                        label="Senha Antiga"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        required
                        error={!!passwordFormError.newPassword}
                        helperText={passwordFormError.newPassword}
                        value={password.newPassword}
                        onChange={handleChangePasswordForm}
                        margin="dense"
                        name="newPassword"
                        label="Nova Senha"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        required
                        error={!!passwordFormError.confirmNewPassword}
                        helperText={passwordFormError.confirmNewPassword}
                        value={password.confirmNewPassword}
                        onChange={handleChangePasswordForm}
                        margin="dense"
                        name="confirmNewPassword"
                        label="Confirmar Nova Senha"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} sx={{ color: "black" }}>Cancelar</Button>
                    <Button variant="contained" type="submit" color="error">Confirmar</Button>
                </DialogActions>
            </Dialog>
            <MySnackBar
                open={popSnackBarUp}
                message={'Senha Atualizada com sucesso!'}
                onClose={() => setPopSnackBarUp(false)}
            />
        </React.Fragment>
    );
}

export { ChangePasswordDialog }