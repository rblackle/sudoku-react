import React, {Dispatch, SetStateAction} from "react";
import {createDefaultGameState, GameState} from "src/utilities/IOUtils";

interface GameStateContext {
    gameState: GameState,
    updateGameState: Dispatch<SetStateAction<GameState>>,
}

const GameStateContext = React.createContext<GameStateContext>({
    gameState: createDefaultGameState(),
    updateGameState: () => {},
});

export interface GameStateProviderProps {
}

export function GameStateProvider(props: React.PropsWithChildren<GameStateProviderProps>) {
    const [gameState, setGameState] = React.useState<GameState>(createDefaultGameState);

    const value = React.useMemo<GameStateContext>(() => {
        return {
            gameState,
            updateGameState: setGameState
        };
    }, [gameState, setGameState]);

    return <GameStateContext.Provider value={value}>
        {props.children}
    </GameStateContext.Provider>;
}

export function useGameState(): GameState {
    const context = React.useContext(GameStateContext);
    return context.gameState;
}

export function useUpdateGameState(): Dispatch<SetStateAction<GameState>> {
    const context = React.useContext(GameStateContext);
    return context.updateGameState;
}