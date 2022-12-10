import React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";

interface SudokuCellProps {

}

export const SudokuCell = (props: SudokuCellProps) => {
    const [value, setValue] = React.useState<string>("");
    //TODO: Better option than Input
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
            value={value}
            onKeyDown={(evt) => {
                const value = evt.key;
                if (value <= '9' && value >= '0') {
                    setValue(evt.key);
                } else if (value === "Backspace" || value === "Delete") {
                    setValue("");
                }
            }}
        />
    );
}