import Box from "@mui/joy/Box";
import * as React from "react";

interface HeaderProps {
    children: React.ReactNode,
}

export function Header(props: HeaderProps) {
    return (
        <Box
            sx={[
                {
                    p: 2,
                    gap: 2,
                    bgcolor: 'background.surface',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gridColumn: '1 / -1',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                },
            ]}
        >
            {props.children}
        </Box>
    );
}