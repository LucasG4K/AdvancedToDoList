import React, { ChangeEvent, useState } from "react";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { useUser } from "../../../providers/userProvider";
import { ProfileScreen, ProfileContainer, ProfileInfomation, ProfilePicture, StyledTextField } from "./profileStyles";
import { BadgeProfile } from "./components/pictureBadge";
import { CheckOutlined, EditOutlined } from "@mui/icons-material";

const Profile: React.FC = () => {
    const { user, handleChangeProfilePic } = useUser();
    const [editing, setEditing] = useState(false);

    if (!user) {
        return <Typography>Carregando...</Typography>;
    }

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
                <ProfileContainer>
                    <ProfileInfomation >
                        <Typography>Nome:</Typography>
                        <StyledTextField disabled={!editing} value={user.username} />
                    </ProfileInfomation>
                    <ProfileInfomation>
                        <Typography>E-mail:</Typography>
                        <StyledTextField disabled value={user.email || ''} />
                    </ProfileInfomation>
                    <ProfileInfomation>
                        <Typography>Nome de Usuário:</Typography>
                        <StyledTextField disabled value={user.username || ''} />
                    </ProfileInfomation>
                    <ProfileInfomation>
                        <Typography>Gênero:</Typography>
                        <StyledTextField disabled={!editing} select value={user.profile.gender || ''} >
                            <MenuItem value="male">Masculino</MenuItem>
                            <MenuItem value="female">Feminino</MenuItem>
                            <MenuItem value="other">Outro</MenuItem>
                        </StyledTextField>
                    </ProfileInfomation>
                    <ProfileInfomation>
                        <Typography>Empresa:</Typography>
                        <StyledTextField disabled={!editing} value={user.profile.company || ''} />
                    </ProfileInfomation>
                    <ProfileInfomation>
                        <Typography>Data de Nascimento:</Typography>
                        <StyledTextField disabled={!editing} type="date" value={user.profile.birthDate.toISOString().split('T')[0] || ''} />
                    </ProfileInfomation>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                        <Button variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} onClick={() => setEditing(!editing)}>
                            {!editing ? (
                                <>
                                    <EditOutlined />
                                    Editar
                                </>
                            ) : (
                                <>
                                    <CheckOutlined />
                                    Salvar
                                </>
                            )}
                        </Button>
                    </Box>
                </ProfileContainer>
            </ProfileScreen>
        </>
    );
};

export { Profile };
