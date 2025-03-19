import React, { ChangeEvent, useState } from "react";
import { Box, Button, IconButton, MenuItem, Typography } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { useUser } from "../../../providers/userProvider";
import { ProfileScreen, ProfileContainer, ProfileInfomation, ProfilePicture, StyledTextField } from "./profileStyles";
import { BadgeProfile } from "./components/pictureBadge";
import { CheckOutlined, EditOutlined } from "@mui/icons-material";
import { LoadingScreen } from "../../components/loadingScreen";
import { ChangePasswordDialog } from "./components/changePassword";
import { MySnackBar } from "../../components/mySnackBar";


const Profile: React.FC = React.memo(() => {
    const { user, setUserForm, userForm, handleChangeUserForm, handleChangeProfilePic, handleEditProfile, isLoadingUser } = useUser();
    const [editing, setEditing] = useState<boolean>(false);
    const [popSnackBarUp, setPopSnackBarUp] = useState<boolean>(false);

    const [userFormError, setUserFormError] = useState({
        email: "",
        gender: "",
        name: "",
        birthDate: "",
    });

    const emailRegex = /^(.+)@[\w]+\.\w+$/;
    const today = new Date();

    const transformDate = (date: Date | string): Date | undefined => {
        if (date instanceof Date) {
            const temp = date.toISOString().split('T')[0];
            const formattedDate = new Date(`${temp.split('-')[0]}/${temp.split('-')[1]}/${temp.split('-')[2]}`);
            return formattedDate;
        } return undefined;
    }

    React.useMemo(() => {
        setUserForm(user!);
    },[]);

    React.useEffect(() => {
        const genderOptions = ['male', 'female', 'other']; // Gêneros válidos
        setUserFormError({
            email: userForm.email === "" || emailRegex.test(userForm.email) ? "" : "E-mail inválido",
            name: userForm.profile.name === "" || userForm.profile.name.length > 2 ? "" : "O nome deve ter pelo menos 3 caracteres",
            birthDate: userForm.profile.birthDate === "" || transformDate(userForm.profile.birthDate)! <= today ? "" : "Data inválida",
            gender: userForm.profile.gender === "" || genderOptions.includes(userForm.profile.gender) ? "" : "Gênero não atribuído", // Validação do gênero
        });
    }, [userForm]); // O efeito será executado sempre que o userForm mudar

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione um arquivo de imagem válido.');
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                try {
                    handleChangeProfilePic(base64Image);
                } catch (error) {
                    if (error instanceof Error) {
                        alert(error.message)
                    }
                }
            };
        }
    };

    const handleImageRemove = () => {
        try {
            handleChangeProfilePic('');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    const handleSuccess = () => {
        setEditing(false);
        setPopSnackBarUp(true);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Verifica se existem erros no formulário
        const validationErrors = userFormError;

        // Coletando erros para exibir
        const errors = Object.values(validationErrors).filter(error => error !== "");

        if (errors.length > 0) {
            // Se houver erros, mostrar uma mensagem amigável
            const errorMessage = errors.join("\n"); // Junta todos os erros em uma string separada por novas linhas
            alert(`Por favor, corrija os seguintes erros:\n${errorMessage}`);
            return;
        }

        try {
            await handleEditProfile(handleSuccess);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    };

    if (isLoadingUser) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MyAppBar title="PERFIL" />
            <ProfileScreen>
                <ProfilePicture>
                    <BadgeProfile
                        handleImageUpload={handleImageUpload}
                        handleImageRemove={handleImageRemove}
                        avatarSrc={user?.profile?.avatar || ''}
                    />
                </ProfilePicture>
                <Box sx={ProfileContainer}>
                    <Box component='form' onSubmit={handleSubmit}>
                        <ProfileInfomation >
                            <IconButton
                                onClick={() => setEditing(!editing)}
                                sx={{
                                    position: 'absolute',
                                    top: 2,
                                    right: 2,
                                }}
                            >
                                <EditOutlined sx={{ color: "green" }} />
                            </IconButton>
                            <Typography>Nome:</Typography>
                            <StyledTextField
                                disabled={!editing}
                                name='name'
                                required
                                error={!!userFormError.name}
                                helperText={userFormError.name}
                                value={userForm.profile.name}
                                onChange={handleChangeUserForm}
                            />
                        </ProfileInfomation>
                        <ProfileInfomation>
                            <Typography>E-mail:</Typography>
                            <StyledTextField
                                disabled
                                name='email'
                                value={userForm.email}
                                onChange={handleChangeUserForm}
                            />
                        </ProfileInfomation>
                        <ProfileInfomation>
                            <Typography>Nome de Usuário:</Typography>
                            <StyledTextField
                                disabled
                                value={userForm.username || ''}
                            />
                        </ProfileInfomation>
                        <ProfileInfomation>
                            <Typography>Gênero:</Typography>
                            <StyledTextField
                                disabled={!editing}
                                select
                                required
                                name='gender'
                                error={!!userFormError.gender}
                                helperText={userFormError.gender}
                                value={userForm.profile.gender || ''}
                                onChange={handleChangeUserForm}
                            >
                                <MenuItem value="male">Masculino</MenuItem>
                                <MenuItem value="female">Feminino</MenuItem>
                                <MenuItem value="other">Outro</MenuItem>
                            </StyledTextField>
                        </ProfileInfomation>
                        <ProfileInfomation>
                            <Typography>Empresa:</Typography>
                            <StyledTextField
                                disabled={!editing}
                                name='company'
                                value={userForm.profile.company || ''}
                                onChange={handleChangeUserForm}
                            />
                        </ProfileInfomation>
                        <ProfileInfomation>
                            <Typography>Data de Nascimento:</Typography>
                            <StyledTextField
                                disabled={!editing}
                                type="date"
                                name="birthDate"
                                required
                                error={!!userFormError.birthDate}
                                helperText={userFormError.birthDate}
                                onChange={handleChangeUserForm}
                                value={userForm.profile.birthDate ? userForm.profile.birthDate.toISOString().split('T')[0] : ''} // Formato YYYY-MM-DD
                            />

                        </ProfileInfomation>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                            <Button
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                variant="contained"
                                disabled={!editing}
                                type="submit"
                                loading={isLoadingUser}
                            >
                                <CheckOutlined />
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                    <ProfileInfomation>
                        <ChangePasswordDialog />
                    </ProfileInfomation>
                </Box>
                <MySnackBar
                    open={popSnackBarUp}
                    message={'Perfil editado com sucesso!'}
                    onClose={() => setPopSnackBarUp(false)}
                />
            </ProfileScreen >
        </>
    );
});

export { Profile };
