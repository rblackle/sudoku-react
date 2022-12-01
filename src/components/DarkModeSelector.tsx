import React from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useColorScheme } from '@mui/joy/styles/CssVarsProvider';
import IconButton from "@mui/joy/IconButton";

export const DarkModeSelector = () => {
    const { mode, setMode } = useColorScheme();

    return (
        <IconButton
            size="sm"
            variant="outlined"
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}