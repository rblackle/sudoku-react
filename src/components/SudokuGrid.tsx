import React from "react";

import {SudokuRegion} from "./SudokuRegion";
import Box from "@mui/joy/Box";

interface SudokuGridProps {

}

export const SudokuGrid = (props: SudokuGridProps) => {
    return (
        <Box display="block">
            <Box
                display="grid"
                gap="5px"
                justifyContent="center"
                gridTemplateColumns={{
                    xs: 'repeat(3, auto)',
                }}
                gridTemplateRows="repeat(3, 1fr)"
            >
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
                <SudokuRegion/>
            </Box>
        </Box>
    );
};