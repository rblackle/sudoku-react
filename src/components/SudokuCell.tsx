import React from "react";

import TextField from "@mui/joy/Input";

interface SudokuCellProps {

}

export const SudokuCell = (props: SudokuCellProps) => {
    const [value, setValue] = React.useState<string>("");
    //TODO: Better option than Textfield
    //TODO: EG Don't show cursor, maybe show it's always selecting the full input
    return (
        <TextField
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