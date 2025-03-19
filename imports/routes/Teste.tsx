import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

type UserProfile = {
    name: string;
    birthDate: string;
};

type UserModel = {
    email: string;
    password: string;
    confirmPassword: string;
    profile: UserProfile;
    createdAt: Date;
};

export default function UserForm() {
    const [userForm, setUserForm] = useState<UserModel>({
        email: "",
        password: "",
        confirmPassword: "",
        profile: {
            name: "",
            birthDate: "",
        },
        createdAt: new Date(),
    });

    const [userFormError, setUserFormError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        profile: {
            name: "",
            birthDate: "",
        },
    });

    const emailRegex = /^(.+)@[\w]+\.\w+$/;
    const today = new Date().toISOString().split("T")[0]; // Data de hoje no formato YYYY-MM-DD

    useEffect(() => {
        setUserFormError({
            email: userForm.email === "" || emailRegex.test(userForm.email) ? "" : "E-mail inválido",
            password: userForm.password === "" || userForm.password.length >= 6 ? "" : "A senha deve ter pelo menos 6 caracteres",
            confirmPassword: userForm.confirmPassword === "" || userForm.confirmPassword === userForm.password ? "" : "As senhas não coincidem",
            profile: {
                name: userForm.profile.name === "" || userForm.profile.name.length > 2 ? "" : "O nome deve ter pelo menos 3 caracteres",
                birthDate: userForm.profile.birthDate === "" || userForm.profile.birthDate <= today ? "" : "Data inválida",
            },
        });
    }, [userForm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.includes("profile.")) {
            const key = name.split(".")[1];
            setUserForm((prev) => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [key]: value,
                },
            }));
        } else {
            setUserForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div>
            <h2>Cadastro</h2>

            <TextField
                error={!!userFormError.email}
                helperText={userFormError.email}
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={userForm.email}
                onChange={handleChange}
                style={{ borderColor: userFormError.email ? "red" : "black" }}
            />

            <TextField
                error={!!userFormError.password}
                helperText={userFormError.password}
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={userForm.password}
                onChange={handleChange}
                style={{ borderColor: userFormError.password ? "red" : "black" }}
            />

            <TextField
                type="password"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                value={userForm.confirmPassword}
                onChange={handleChange}
                style={{ borderColor: userFormError.confirmPassword ? "red" : "black" }}
            />
            {userFormError.confirmPassword && <p style={{ color: "red" }}>{userFormError.confirmPassword}</p>}

            <TextField
                type="text"
                name="profile.name"
                placeholder="Nome"
                value={userForm.profile.name}
                onChange={handleChange}
                style={{ borderColor: userFormError.profile.name ? "red" : "black" }}
            />
            {userFormError.profile.name && <p style={{ color: "red" }}>{userFormError.profile.name}</p>}

            <TextField
                type="date"
                name="profile.birthDate"
                value={userForm.profile.birthDate}
                onChange={handleChange}
                style={{ borderColor: userFormError.profile.birthDate ? "red" : "black" }}
            />
            {userFormError.profile.birthDate && <p style={{ color: "red" }}>{userFormError.profile.birthDate}</p>}
        </div>
    );
}
