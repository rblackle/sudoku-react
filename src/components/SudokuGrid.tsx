import React from "react";

import {SudokuRegion} from "./SudokuRegion";
import Box from "@mui/material/Box";
import {CellValues, RegionValue} from "src/utilities/IOUtils";
import {useGameState, useUpdateGameState} from "src/context/GameStateContext";

interface SudokuGridProps {
}

export const SudokuGrid = (props: SudokuGridProps) => {
    const gameState = useGameState();
    let updateGameState = useUpdateGameState();

    function handleRegionChanged(index: number, updateFn: (prev: RegionValue) => RegionValue) {
        updateGameState(prev => {
            const cellValuesCopy: CellValues = [...prev.cellValues];
            cellValuesCopy[index] = updateFn(cellValuesCopy[index]);
            return {
                ...prev,
                cellValues: cellValuesCopy
            };
        })

    }

    return (
        <Box display="block">
            <Box
                display="grid"
                gap="8px"
                justifyContent="center"
                gridTemplateColumns={{
                    xs: 'repeat(3, auto)',
                }}
                gridTemplateRows="repeat(3, 1fr)"
            >
                {gameState.cellValues.map((regionValue, index) => {
                    return <SudokuRegion
                        key={index}
                        value={regionValue}
                        onRegionChanged={newValue => handleRegionChanged(index, newValue)}
                    />;
                })}
            </Box>
        </Box>
    );
};