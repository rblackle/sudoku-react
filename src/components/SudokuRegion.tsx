import React, {SetStateAction} from "react";

import Box from "@mui/material/Box";
import {SudokuCell} from "./SudokuCell";
import {CellValue, RegionValue, Tuple9} from "src/utilities/IOUtils";

interface SudokuRegionProps {
    value: RegionValue,
    onRegionChanged: (updateFn: (prev: RegionValue) => RegionValue) => void,
}

export const SudokuRegion = React.memo((props: SudokuRegionProps) => {
    function handleCellChange(index: number, newValue: CellValue) {
        props.onRegionChanged((prev: RegionValue) => {
            const copy: Tuple9<CellValue> = [...prev];
            copy[index] = newValue;
            return copy;
        });
    }
    return (
        <Box
            display="grid"
            gap="2px"
            gridTemplateColumns={{
                xs: 'repeat(3, 35px)',
            }}
            gridTemplateRows="repeat(3, 3fr)"
        >
            {props.value.map(
                (cellValue, index) => {
                    return <SudokuCell
                        key={index}
                        value={cellValue}
                        onChange={newValue => handleCellChange(index, newValue)}/>;
                }
            )}
        </Box>
    );
});

SudokuRegion.displayName = "SudokuRegion";