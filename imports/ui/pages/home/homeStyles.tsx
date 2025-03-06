import { Box, styled } from "@mui/material";

const HomeScreen = styled(Box)(() => ({
    width: '100vw',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
}));

const Overview = styled(Box)(() => ({
    marginTop: '12px', 
    display: 'flex',
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
}));

const Tasks = styled(Box)(() => ({
    width: '80vw',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8px',
    boxSizing: 'content-box',
    border: 'solid #000000 2px'
}));

export { HomeScreen, Overview, Tasks };  