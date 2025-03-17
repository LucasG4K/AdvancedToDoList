import { Avatar, Box, Typography } from "@mui/material"
import { UserModel } from "../../api/User/UserModel";
import React from "react";

interface IMiniProfileProps {
    user: UserModel;
}

const MiniProfile: React.FC<IMiniProfileProps> = ({ user }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: 2,
        }}>
            <Avatar src={user?.profile?.avatar || ''}/>
            <Typography >{user.username}</Typography>
            <Typography>{user.profile.company}</Typography>
            <Typography>{user.email}</Typography>
        </Box>
    );
}

export { MiniProfile }