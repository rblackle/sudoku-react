import React from "react";
import Box from "@mui/material/Box";

interface NavigationBarProps {
    children: React.ReactNode,
}

export function NavigationBar(props: NavigationBarProps) {
    return (
        <Box
            sx={[
                {
                    p: 2,
                    bgcolor: 'background.surface',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    display: {
                        xs: 'none',
                        sm: 'initial',
                    },
                },
            ]}
        >
            {props.children}
        </Box>
    );
}