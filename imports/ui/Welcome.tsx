import { Button } from '@mui/material';
import React from 'react';

export const Welcome = ({ logout }: { logout: () => void }) => {
    return (
        <div>
            <h2>Welcome</h2>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
};
