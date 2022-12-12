export const validCellValues = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type CellValue = typeof validCellValues[number];

export type Tuple9<T> = [T, T, T, T, T, T, T, T, T];

function isTuple9<T>(possibleTuple: T[]): possibleTuple is Tuple9<T> {
    return possibleTuple.length === 9;
}

export type RowValue = Tuple9<CellValue>;

export type RegionValue = Tuple9<CellValue>;

export type CellValues = Tuple9<RegionValue>;

function createEmptyRegionValues(): RegionValue {
    return [
      null, null, null,
      null, null, null,
      null, null, null
    ];
}

function createEmptyCellValues(): CellValues {
    return [
        createEmptyRegionValues(), createEmptyRegionValues(), createEmptyRegionValues(),
        createEmptyRegionValues(), createEmptyRegionValues(), createEmptyRegionValues(),
        createEmptyRegionValues(), createEmptyRegionValues(), createEmptyRegionValues(),
    ];
}

export function createDefaultGameState(): GameState {
    return {
      cellValues: createEmptyCellValues(),
      constraints: ["normal"]
    };
}

export function convertRowValuesToRegionValues(cellValues: Tuple9<RowValue>): CellValues {
    const toReturn: Tuple9<RegionValue> = createEmptyCellValues();
    for(let gridNo = 0; gridNo < 9; gridNo++) {
        // grid offsets (x, y)
        // 0 = (0, 0), 1 = (3, 0), 2 = (6, 0)
        // 3 = (0, 3), 4 = (3, 3), 5 = (6, 3)
        // 6 = (0, 6), 7 = (3, 6), 8 = (6, 6)
        const gridX = (gridNo % 3) * 3;
        // use | 0 truncate decimal places
        const gridY = ((gridNo / 3) | 0) * 3;
        for(let i = 0; i < 9; i++) {
            // relative coords within overall grid offset (x, y)
            // 0 = (0, 0), 1 = (1, 0), 2 = (2, 0)
            // 3 = (0, 1), 4 = (1, 1), 5 = (2, 1)
            // 6 = (0, 2), 7 = (1, 2), 8 = (2, 2)
            const relativeX = i % 3;
            // use | 0 truncate decimal places
            const relativeY = i / 3 | 0;
            toReturn[gridNo][i] = cellValues[gridY + relativeY][gridX + relativeX];
        }
    }
    return toReturn;
}

type CellIndex = number;

const validCellRangeShortcut = [
    "row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8", "row9",
    "column1", "column2", "column3", "column4", "column5", "column6", "column7", "column8", "column9",
    "region1", "region2", "region3", "region4", "region5", "region6", "region7", "region8", "region9",
] as const;

type CellRangeConstant = typeof validCellRangeShortcut[number];

type CellRange = CellIndex[] | CellRangeConstant;

type Constraint = UniqueConstraint | "normal";

interface UniqueConstraint {
    type: "unique",
    cells: CellRange,
}

export interface GameState {
    cellValues: CellValues,
    constraints: Constraint[]
}

// Validate the data in an untrusted cellValues
// If the data is a valid configuration, create a copy of the data that matches the configuration
// without copying any of the untrusted values, which could have extra keys.
// We should be protecting against __proto__ already, but it doesn't hurt to be safe.
export function validateAndSanitizeRowValues(unsafeCellValues: any): Tuple9<RowValue> | null {
    if (!Array.isArray(unsafeCellValues) || !isTuple9(unsafeCellValues)) {
        return null;
    }

    const newCellValues: RowValue[] = [];
    for (let i = 0; i < 9; i++) {
        const row = validateAndSanitizeRow(unsafeCellValues[i]);
        if (row == null) {
            return null;
        }
        newCellValues.push(row);
    }
    // if for typescript
    if (isTuple9(newCellValues)) {
        return newCellValues;
    }
    return null;
}

export function validateAndSanitizeRow(unsafeRow: any): RowValue | null {
    if (!Array.isArray(unsafeRow) || !isTuple9(unsafeRow)) {
        return null;
    }
    const newCellValues: CellValue[] = [];
    for (let i = 0; i < unsafeRow.length; i++) {
        const unsafeCell = unsafeRow[i];
        let validValue = validCellValues.find(validValue => validValue === unsafeCell);
        if (validValue === undefined) {
            return null;
        }
        newCellValues[i] = validValue;
    }

    // If for ts
    if (isTuple9(newCellValues)) {
        return newCellValues;
    }
    return null;
}

// Validate the data in an untrusted constraint array
// If the data is a valid configuration, create a copy of the data that matches the configuration
// without copying any of the untrusted values, which could have extra keys.
// We should be protecting against __proto__ already, but it doesn't hurt to be safe.
export function validateAndSanitizeConstraints(unsafeConstraints: any): Constraint[] | null {
    if (!Array.isArray(unsafeConstraints)) {
        return null;
    }
    const newConstraints: Constraint[] = [];
    for (const unsafeConstraint of unsafeConstraints) {
        if (unsafeConstraint === "normal") {
            newConstraints.push("normal");
            continue;
        }

        switch (unsafeConstraint.type) {
            default:
                return null;
            case "unique": {
                const shortcut = validCellRangeShortcut.find(shortcut => shortcut === unsafeConstraint.cells);
                if (shortcut) {
                    newConstraints.push({
                        type: "unique",
                        cells: shortcut
                    });
                    continue;
                }
                if (!Array.isArray(unsafeConstraint.cells) || unsafeConstraint.cells.length < 1) {
                    return null;
                }
                const newCellRange: CellIndex[] = [];
                for (const unsafeCellIndex of unsafeConstraint.cells) {
                    if (!Number.isInteger(unsafeCellIndex) || unsafeCellIndex > 80 || unsafeCellIndex < 0) {
                        return null;
                    }
                    newCellRange.push(unsafeCellIndex);
                }
                newConstraints.push({
                    type: "unique",
                    cells: newCellRange
                });
                break;
            }
        }
    }
    return newConstraints;
}

export function parseSanitizedBoardState(input: string): GameState | null {
    try {
        const unsafeBoardState = JSON.parse(input, (key, value) => key === "__proto__" ? undefined : value);

        const rowValues = validateAndSanitizeRowValues(unsafeBoardState.cellValues);
        const constraints = validateAndSanitizeConstraints(unsafeBoardState.constraints);

        if (rowValues == null || constraints == null) {
            return null;
        }

        return {
            cellValues: convertRowValuesToRegionValues(rowValues),
            constraints
        };
    } catch(e) {
        console.info(e);
        return null;
    }
}