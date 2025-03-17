import { Box, styled } from "@mui/material";

const HomeScreen = styled(Box)(() => ({
    width: '100vw',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
}));

const Overview = styled(Box)(() => ({
    marginTop: 1, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 8
}));

const Tasks = styled(Box)(() => ({
    width: '80vw',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export { HomeScreen, Overview, Tasks };  