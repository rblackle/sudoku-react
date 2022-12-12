import React, {SetStateAction} from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import {CellValue, RegionValue, validCellValues} from "src/utilities/IOUtils";

interface SudokuCellProps {
    value: CellValue,
    onChange: (newValue: CellValue) => void,
}

export const SudokuCell = (props: SudokuCellProps) => {
    //TODO: Better option than Input for multi-select, etc
    //TODO: EG Don't show cursor, maybe show it's always selecting the full input
    return (
        <OutlinedInput
            sx={{
                "& .MuiOutlinedInput-input": {
                    padding: 0,
                    fontSize: "24px",
                    textAlign: "center"
                }
            }}
            value={props.value ?? ""}
            onKeyDown={(evt) => {
                if (evt.key === "Backspace" || evt.key === "Delete") {
                    props.onChange(null);
                } else {
                    const numericValue = +evt.key;
                    const validValue = validCellValues.find(validVal => validVal === numericValue);
                    if (validValue) {
                        props.onChange(validValue);
                    }
                }
            }}
        />
    );
}