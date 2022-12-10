import React from "react";

import Box from "@mui/material/Box";
import {SudokuCell} from "./SudokuCell";

interface SudokuRegionProps {

}

export const SudokuRegion = (props: SudokuRegionProps) => {
    return (
        <Box
            display="grid"
            gap="2px"
            gridTemplateColumns={{
                xs: 'repeat(3, 35px)',
            }}
            gridTemplateRows="repeat(3, 3fr)"
        >
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
            <SudokuCell/>
        </Box>
    );
}