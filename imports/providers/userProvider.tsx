import React, { ChangeEvent, createContext, ReactNode, useContext, useState } from "react";
import { UserModel, UserModelProfile } from "../api/User/UserModel";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

interface UserContextType {
    user: UserModel | null;
    isLoadingUser: boolean;
    userForm: UserModel;
    setUserForm: (user: UserModel) => void;
    handleLogin: (email: string, password: string) => void;
    handleSignUp: (user: UserModel, password: string) => void;
    handleEditProfile:  (callback?: () => void) => void;
    handleChangeUserForm: (event: ChangeEvent<HTMLInputElement>) => void;
    clearUser: () => void;
    handleChangeProfilePic: (base64Image: string) => void;
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

    const isLoadingUser = useSubscribe('users')();

    const user: UserModel | null = useTracker(() => {
        const meteorUser = Meteor.user();
        if (!meteorUser) return null;

        const profile = (meteorUser.profile as UserModelProfile) || {};

        return {
            _id: meteorUser._id || "",
            email: meteorUser.emails?.[0]?.address || "",
            username: meteorUser.username || "",
            profile: {
                name: profile.name || "",
                birthDate: profile.birthDate ? new Date(profile.birthDate) : '',
                avatar: profile.avatar || "",
                company: profile.company || "",
                gender: profile.gender || '',
            },
            createdAt: meteorUser?.createdAt || new Date(),
        } as UserModel;
    }, [Meteor.userId()]);

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

    const handleChangeProfilePic = async (base64Image: string): Promise<void> => {
        return await new Promise<void>((resolve, reject) => {
            Meteor.call('user.updateAvatar', base64Image, (error: Meteor.Error) => {
                if (error) {
                    reject(new Error('Erro ao salvar imagem: ' + error.message));
                } else {
                    resolve();
                }
            });
        });
    }

    const handleEditProfile = async (callback?: () => void): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            Meteor.call('user.update', userForm.profile, (error: Meteor.Error) => {
                if (error) {
                    reject(new Error('Erro ao atualizar perfil: ' + error.message));
                } else {
                    resolve();
                    if (callback) {
                        callback(); // Executa o callback após a atualização bem-sucedida
                    }
                }
            });
        });
    };


    const [userForm, setUserForm] = useState<UserModel>({
        _id: user?._id || '',
        email: user?.email || '',
        username: user?.username || '',
        profile: {
            name: user?.profile.name || '',
            birthDate: user?.profile.birthDate || '',
            avatar: user?.profile.avatar || '',
            company: user?.profile.company || '',
            gender: user?.profile.gender || ''
        },
        createdAt: user?.createdAt || new Date(),
    } as UserModel);

    React.useEffect(() => {
        if (user && JSON.stringify(user) !== JSON.stringify(userForm)) {
            setUserForm(user);
        }
    }, [user]);

    const handleChangeUserForm = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name in userForm.profile) {
            setUserForm({
                ...userForm,
                profile: {
                    ...userForm.profile,
                    [name]: value
                }
            })
        } else {
            setUserForm({
                ...userForm,
                [name]: value
            });
        }
    }

    const clearUser = () => {
        setUserForm({
            _id: '',
            email: '',
            username: '',
            profile: {
                name: '',
                birthDate: "",
                avatar: '',
                company: '',
                gender: ""
            },
            createdAt: new Date(),
        })
    }

    const UserProviderProps = {
        user,
        isLoadingUser,
        userForm,
        setUserForm,
        handleChangeUserForm,
        clearUser,
        handleLogin,
        handleSignUp,
        handleChangeProfilePic,
        handleEditProfile,
    }

    return (
        <UserContext.Provider value={UserProviderProps}>
            {children}
        </UserContext.Provider>
    );
}

export { useUser, UserProvider };