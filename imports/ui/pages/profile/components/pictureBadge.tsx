import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton } from '@mui/material';
import React, { useState } from 'react';

interface IBadgeProfileProps {
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageRemove: () => void;
    avatarSrc: string;
}

const BadgeProfile: React.FC<IBadgeProfileProps> = ({ handleImageUpload, handleImageRemove, avatarSrc }) => {

    const [hover, setHover] = useState(false);
    return (
        <Box
            sx={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <label htmlFor="upload-avatar">
                <Avatar
                    sx={{
                        height: 300,
                        width: 300,
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: 3,
                        },
                    }}
                    src={avatarSrc}
                />
            </label>
            <input
                type="file"
                id="upload-avatar"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
            />

            {hover && (
                <>
                    <IconButton
                        component="label"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-100%, -50%)",
                            backgroundColor: "green",
                            color: "white",
                            "&:hover": { backgroundColor: "#14eb00" },
                        }}
                    >
                        <EditOutlined />
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </IconButton>

                    {/* Botão de Remover */}
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(0%, -50%)",
                            backgroundColor: "red",
                            color: "white",
                            boxShadow: 2,
                            "&:hover": { backgroundColor: "#ff4f4f" },
                        }}
                        onClick={handleImageRemove}
                    >
                        <DeleteOutline />
                    </IconButton>
                </>
            )}
        </Box>
    );

};

export { BadgeProfile };