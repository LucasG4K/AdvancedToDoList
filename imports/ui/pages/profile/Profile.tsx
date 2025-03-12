import React from "react";
import { Box, Typography } from "@mui/material";
import { MyAppBar } from "../../components/myAppBar";
import { useUser } from "../../../providers/userProvider";

const Profile: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return <Typography>Carregando...</Typography>;
    }

    return (
        <Box>
            <MyAppBar user={user} title="PERFIL" />
            <Box p={3}>
                <Typography variant="h5">Nome: {user.username}</Typography>
                <Typography variant="body1">E-mail: {user.email || "Não informado"}</Typography>
            </Box>
        </Box>
    );
};

export { Profile };
