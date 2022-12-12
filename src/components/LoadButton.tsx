import React from 'react';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import {parseSanitizedBoardState} from "src/utilities/IOUtils";
import Alert from "@mui/material/Alert";
import {useUpdateGameState} from "src/context/GameStateContext";

interface SnackbarState {
    message: string,
    open: boolean,
}

interface LoadButtonProps {
}

export function LoadButton(props: LoadButtonProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({message: "", open: false});
    const updateGameState = useUpdateGameState();

    function clearFileInput() {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function loadFile(files: FileList | null) {
        if (files?.length) {
            const fr = new FileReader();
            fr.onerror = () => {
                setSnackbarState({message: "An error occurred while loading the file", open: true});
            }
            fr.onload = evt => {
                const fileContents = evt.target?.result;
                if (typeof fileContents === "string") {
                    // Check to keep typescript happy:
                    // The file contents should always be string because we're using readAsText
                    const boardState = parseSanitizedBoardState(fileContents);
                    if (boardState) {
                        updateGameState(boardState);
                    } else {
                        setSnackbarState({message: "The file you selected is invalid", open: true});
                    }
                }
            }
            fr.readAsText(files[0]);
        }
    }

    return (
        <IconButton
            size="small"
            component="label"
        >
            <FileUploadRoundedIcon/>
            <input type="file" hidden accept=".sudoku" ref={inputRef} onChange={evt => {
                loadFile(evt.target.files);
                // Clear the file after loading to allow loading the same file again
                clearFileInput();
            }}/>
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={5000}
                onClose={() => setSnackbarState(prev => ({...prev, open: false}))}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </IconButton>
    );
}

