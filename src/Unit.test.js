import {calculateWinner} from "./utils/common";

test('that calculateWinner detect wins', () => {
    [
        //No winner
        {
            expectedWinner: null,
            squares: ["O", "X", "O", false, false, false, false, false, false]
        },
        //No winner wit full squares
        {
            expectedWinner: null,
            squares: ["O", "X", "O", "X", "X", "O", "X", "O", "X"]
        },
        //3 in a row
        {
            expectedWinner: "O",
            squares: ["O", "O", "O", false, false, false, false, false, false]
        },
        //3 in a column
        {
            expectedWinner: "X",
            squares: [false, "X", false, false, "X", false, false, "X", false]
        },
        //3 in a diagonal
        {
            expectedWinner: "X",
            squares: ["X", false, false, false, "X", false, false, false, "X"]
        },
    ].forEach((dp) => {
        expect(calculateWinner(dp.squares)).toEqual(dp.expectedWinner)
    })
});
