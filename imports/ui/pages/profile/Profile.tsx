import React from "react";
import { User } from "../../../api/User/UserTypes";
import { Box } from "@mui/material";
import { MyAppBar } from "../../component/myAppBar";

interface IProfileProps {
    user: User;
}

const Profile: React.FC<IProfileProps> = ({ user }) => {
    return (
        <Box>
            <MyAppBar user={user} title='PERFIL' />

        </Box>
    );
}

export { Profile }