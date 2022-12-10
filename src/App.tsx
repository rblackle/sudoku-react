import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import theme from "./theme";
import {DarkModeSelector} from "./components/DarkModeSelector";
import { Header } from './components/Header';
import {NavigationBar} from "./components/NavigationBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {SudokuGrid} from "./components/SudokuGrid";
import {Experimental_CssVarsProvider as CssVarsProvider} from "@mui/material/styles/CssVarsProvider";

function App() {
    return (
        <CssVarsProvider theme={theme}>
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
                    <Paper
                        sx={{
                            display: { xs: 'none', sm: 'initial' },
                            borderLeft: '1px solid',
                            borderColor: 'neutral.outlinedBorder',
                        }}
                    >

                    </Paper>
                </Box>
            </Stack>
        </CssVarsProvider>
    );
}

export default App;
