import { Box } from "@mui/system";
import { CardOverviewStyles } from "./cardOverviewStyle";
import React from "react";
import { Typography } from "@mui/material";

interface ICardOverviewProps {
    title: string,
    value: number,
}

const CardOverview: React.FC<ICardOverviewProps> = React.memo(({ title, value }) => {
    return (
        <Box sx={CardOverviewStyles.container}>
            <Typography sx={{m: '7px'}}>{title}</Typography>
            <Typography sx={{p: '7px', fontWeight: 'bold', fontSize: '24px'}}>{value}</Typography>
        </Box>
    )
});

export { CardOverview };