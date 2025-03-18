import { Box, styled, TextField } from "@mui/material";

const ProfileScreen = styled(Box)(() => ({
    paddingTop: 64,
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
}));

const ProfileContainer = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    boxSizing: 'content-box',
    border: 'solid #000000 2px'
};

const ProfileInfomation = styled(Box)(() => ({
    padding: 8,
    width: '50vw',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledTextField = styled(TextField)(() => ({
    flex: 1, // Ocupa o espaço disponível dentro do flexbox
    maxWidth: "50%", // Limita a largura a 50% do container ProfileInfomation
}));

const ProfilePicture = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
}));

export { ProfileScreen, ProfileContainer, ProfileInfomation, ProfilePicture, StyledTextField };  