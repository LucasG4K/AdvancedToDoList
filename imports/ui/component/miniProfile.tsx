import { Avatar, Box, Typography } from "@mui/material"
import { User } from "../../api/User/UserTypes";
import React from "react";

interface IMiniProfileProps {
    user: User;
}

const MiniProfile: React.FC<IMiniProfileProps> = ({ user }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: 2,
        }}>
            <Avatar />
            <Typography >{user.username}</Typography>
            <Typography>{user.profile.company}</Typography>
            <Typography>{user.email}</Typography>
        </Box>
    );
}

export { MiniProfile }