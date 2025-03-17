import { Box, styled } from "@mui/material";


const TaskScreen = styled(Box)(() => ({
    padding: 8,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
}));

const Header = styled(Box)(() => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

export { TaskScreen, Header };