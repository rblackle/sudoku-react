import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';

import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import theme from "./theme";
import {DarkModeSelector} from "./components/DarkModeSelector";
import { Header } from './components/Header';
import {NavigationBar} from "./components/NavigationBar";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import {SudokuGrid} from "./components/SudokuGrid";

function App() {
    return (
        <CssVarsProvider disableTransitionOnChange theme={theme}>
            <CssBaseline />
            <Stack height="100vh">
                <Header>
                    <Typography component="h1" fontWeight="xl">
                        Sudoku
                    </Typography>
                    <DarkModeSelector/>
                </Header>
                <Box
                    height="100%"
                    display="grid"
                    gridTemplateColumns={{
                        xs: '1fr',
                        sm: 'minmax(64px, 200px) minmax(370px, 1fr)',
                        md: 'minmax(160px, 300px) minmax(370px, 1fr) minmax(300px, 420px)',
                    }}
                    gridTemplateRows="1fr"
                >
                    <NavigationBar>
                    </NavigationBar>
                    <Box
                        component="main"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={2}
                    >
                        <SudokuGrid/>
                    </Box>
                    <Sheet
                        sx={{
                            display: { xs: 'none', sm: 'initial' },
                            borderLeft: '1px solid',
                            borderColor: 'neutral.outlinedBorder',
                        }}
                    >

                    </Sheet>
                </Box>
            </Stack>
        </CssVarsProvider>
    );
}

export default App;
