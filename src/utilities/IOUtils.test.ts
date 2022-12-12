import {parseSanitizedBoardState, validateAndSanitizeRowValues, validateAndSanitizeConstraints} from "./IOUtils";

test('invalid json being loaded', () => {
    expect(parseSanitizedBoardState("Testing 123")).toBeNull();
});

test('invalid type being loaded', () => {
    expect(parseSanitizedBoardState("\"Testing 123\"")).toBeNull();
});

test('no cellValues', () => {
    const toTest = `
    {
        "constraints": []
    }`;
    expect(parseSanitizedBoardState(toTest)).toBeNull();
});

test('no constraints', () => {
    const toTest = `
    {
        "cellValues": [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ]
    }`;
    expect(parseSanitizedBoardState(toTest)).toBeNull();
});

test('null board parses as expected', () => {
    const toTest = `
    {
        "constraints": [],
        "cellValues": [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ]
    }`;
    expect(parseSanitizedBoardState(toTest)).toEqual({
        constraints: [],
        cellValues: [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ]
    });
});


test('extra properties are ignored', () => {
    const toTest = `
    {
        "extra": [],
        "constraints": [{
            "type": "unique", 
            "cells": [10, 11, 12],
            "extra": "test"
        }],
        "cellValues": [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ]
    }`;
    expect(parseSanitizedBoardState(toTest)).toEqual({
        constraints: [{
            type: "unique",
            cells: [10, 11, 12]
        }],
        cellValues: [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ]
    });
});

test('wrong type for cellValues', () => {
    expect(validateAndSanitizeRowValues("string")).toBeNull();
});

test('not enough rows in grid', () => {
    const invalidCellValues = [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('invalid row type', () => {
    const invalidCellValues = [
        "testing12",
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('not enough cells in a row', () => {
    const invalidCellValues = [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('string type for a cell value', () => {
    const invalidCellValues:any = [
        [null, "1",  null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('fractional number for a cell value', () => {
    const invalidCellValues:any = [
        [null, 1.99,  null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('undefined type for a cell value', () => {
    const invalidCellValues = [
        [null, undefined, null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null],
        [null, null,      null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('boolean type for a cell value', () => {
    const invalidCellValues = [
        [null, true, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('object type for a cell value', () => {
    const invalidCellValues = [
        [null, {},   null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('array type for a cell value', () => {
    const invalidCellValues = [
        [null, [],   null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('function type for a cell value', () => {
    const invalidCellValues = [
        [null, ()=>{},null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null],
        [null, null,  null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('Cell value out of range', () => {
    const invalidCellValues = [
        [null, 10,   null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('Cell value out of range zero', () => {
    const invalidCellValues = [
        [null, 0,   null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('Cell value out of range negative', () => {
    const invalidCellValues = [
        [null, -1,   null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(invalidCellValues)).toBeNull();
});

test('all null cellValues is valid', () => {
    const validCellValues = [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(validCellValues)).toEqual(validCellValues);
});

test('normal looking grid is valid', () => {
    const validCellValues = [
        [null, 1,    null, 4,    2,    null, null, null, null],
        [5,    8,    6,    null, 3,    null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, 4,    null, null, null, 7,    null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, 9,    null],
        [null, null, null, null, null, null, null, null, null]
    ];
    expect(validateAndSanitizeRowValues(validCellValues)).toEqual(validCellValues);
});

test('wrong type for constraints', () => {
    expect(validateAndSanitizeConstraints("string")).toBeNull();
});

test('invalid string shortcut doesn\'t parse', () => {
    expect(validateAndSanitizeConstraints(["testing"])).toBeNull();
});

test('normal constraint parses', () => {
    expect(validateAndSanitizeConstraints(["normal"]))
        .toEqual(["normal"]);
});

test('cell range constraint parses', () => {
    const constraints = [{
        type: "unique",
        cells: [0, 11, 80]
    }];
    expect(validateAndSanitizeConstraints(constraints))
        .toEqual(constraints);
});

test('dual cell constraint parses', () => {
    const constraints = ["normal", {
        type: "unique",
        cells: [0, 11, 80]
    }];
    expect(validateAndSanitizeConstraints(constraints))
        .toEqual(constraints);
});

test('invalid constraint type does not parse', () => {
    const constraints = [{
        "type": "diurnal",
        "cells": [0, 11, 80]
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});

test('cell indices over 80 cause a load to fail', () => {
    const constraints = [{
        type: "unique",
        cells: [81],
        extra: "test"
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});

test('cell indices under 0 cause a load to fail', () => {
    const constraints = [{
        type: "unique",
        cells: [-1],
        extra: "test"
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});

test('fractional cell indices cause a load to fail', () => {
    const constraints = [{
        type: "unique",
        cells: [60.1],
        extra: "test"
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});

test('null cell indices cause a load to fail', () => {
    const constraints = [{
        type: "unique",
        cells: [null],
        extra: "test"
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});

test('string cell indices cause a load to fail', () => {
    const constraints = [{
        type: "unique",
        cells: ["null"],
        extra: "test"
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});

test('empty cell indices cause a load to fail', () => {
    const constraints = [{
        type: "unique",
        cells: [],
        extra: "test"
    }];
    expect(validateAndSanitizeConstraints(constraints)).toBeNull();
});