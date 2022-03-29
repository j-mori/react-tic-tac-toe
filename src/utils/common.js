import React, {Fragment} from "react";
import btcIcon from "./../img/btc.png"
import ethIcon from "./../img/eth.png"

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function renderPlayerSymbol(player) {
    return (
        <Fragment>
            {player ? <img alt={player} width={30} src={
                player === "X" ? btcIcon : player === "O" ? ethIcon : null
            }/> : null
            }
        </Fragment>
    )
}



export {calculateWinner,renderPlayerSymbol};
