import React, { createContext, ReactNode, useContext } from "react";
import { UserModel, UserProfile } from "../api/User/UserModel";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Box, CircularProgress } from "@mui/material";

interface UserContextType {
    user: UserModel | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
}

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const isLoadingUser = useSubscribe('users');

    const user = useTracker(() => {
        const meteorUser = Meteor.user();
        if (!meteorUser) return null; // Se usuário não carregou, retorna null

        const profile = meteorUser.profile as UserProfile || {};

        return {
            _id: meteorUser._id,
            username: meteorUser.username,
            email: meteorUser.emails?.[0]?.address || "", // Pega o primeiro e-mail
            profile: {
                name: profile.name || "",
                gender: profile.gender || "",
                birthDate: profile.birthDate ? new Date(profile.birthDate) : new Date(),
                avatar: profile.avatar || undefined,
                company: profile.company || undefined,
            },
            createdAt: meteorUser.createdAt ? new Date(meteorUser.createdAt) : new Date(),
        } as UserModel;
    });

    if (isLoadingUser()) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}

export { useUser, UserProvider };