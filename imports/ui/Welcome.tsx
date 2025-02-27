import { Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WelcomeProps {
    logout: () => void;
    user: Meteor.User;
}

export const Welcome = ({ logout, user }: WelcomeProps) => {
    const navigate = useNavigate();

    const todoList = () => navigate('/todo-list');

    return (
        <div>
            <h2>Welcome {user.profile!.name}</h2>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={todoList}>Nova Tarefa</Button>
        </div>
    );
};
