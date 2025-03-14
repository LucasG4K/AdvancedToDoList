import React, { createContext, ReactNode, useContext } from "react";
import { UserModel, UserProfile } from "../api/User/UserModel";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

interface UserContextType {
    user: UserModel | null;
    isLoading: boolean;
    handleLogin: (email: string, password: string) => void;
    handleSignUp: (user: UserModel, password: string) => void;
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

    const handleLogin = async (email: string, password: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            Meteor.loginWithPassword(email, password, (error: any) => {
                if (error) {
                    console.log(error)
                    if (error.error === 403) {
                        reject(new Error('Usuário ou senha inválidos.'));
                    }
                    reject(new Error('Erro ao realizar Login: ' + error.message));
                } else {
                    resolve();
                }
            });
        });
    };

    const handleSignUp = async (user: UserModel, password: string): Promise<void> => {
        return await new Promise<void>((resolve, reject) => {
            Meteor.call('user.create', user, password, (error: Meteor.Error) => {
                if (error) {
                    if (error.error === 403) {
                        reject(new Error('Usuário já cadastrado.'));
                    }
                    reject(new Error('Erro ao cadastrar usuário: ' + error.message));
                } else {
                    resolve();
                }
            });

        });
    }

    const isLoading = useSubscribe('users')();

    const user = useTracker(() => {
        const meteorUser = Meteor.user();
        if (!meteorUser) return null;

        const profile = (meteorUser.profile as UserProfile) || {};

        return {
            _id: meteorUser._id,
            username: meteorUser.username,
            email: meteorUser.emails?.[0]?.address || "",
            profile: {
                name: profile.name || "",
                gender: profile.gender || "",
                birthDate: profile.birthDate ? new Date(profile.birthDate) : new Date(),
                avatar: profile.avatar || undefined,
                company: profile.company || undefined,
            },
            createdAt: meteorUser.createdAt ? new Date(meteorUser.createdAt) : new Date(),
        } as UserModel;
    }, [Meteor.userId()]);

    return (
        <UserContext.Provider value={{ user, isLoading, handleLogin, handleSignUp }}>
            {children}
        </UserContext.Provider>
    );
}

export { useUser, UserProvider };