import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ISnackbarProps {
    message: string;
    severity?: "success" | "info" | "warning" | "error";
    open: boolean;
    onClose: () => void;
}

const MySnackBar: React.FC<ISnackbarProps> = ({ message, severity = "success", open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export { MySnackBar }