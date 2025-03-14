import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface IMyDialog {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}

const MyDialog: React.FC<IMyDialog> = ({ open, title, message, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose} sx={{color:"black"}}>Cancelar</Button>
                <Button variant="contained" onClick={onConfirm} color="error">Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyDialog;
