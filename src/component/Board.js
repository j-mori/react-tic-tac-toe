import React, {Fragment, useEffect} from 'react';
import '../css/Game.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {calculateWinner} from "../utils/common";
import {Button} from "react-bootstrap";

function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function retrieveStatusMessage(winner, squares, nextValue, cpuPlayer = null) {
    if(winner){
        return ( <div> {renderPlayerSymbol(winner)} It's skyroketing! 🎉</div>)
    }
    if(squares.every(Boolean)){
        return ( <div>Perfectly balanced as all things should be</div>)
    }
    return (<div>{renderPlayerSymbol(nextValue)} {cpuPlayer===nextValue ? ' (CPU) ' : ''} Move next</div>)
}

function anotherMoveAvailable(winner, squares) {
    return winner
        ? false
        : !squares.every(Boolean)
}

function randomizeCpuPlayer() {
    const rnd = Math.floor(Math.random() * 2);
    if (rnd === 0) {
        return "X"
    } else {
        return "O";
    }
}

function findRandomSquare(squares) {
    let rnd;
    do {
        rnd = Math.floor(Math.random() * 9);
    } while (squares[rnd])
    return rnd;
}

function renderPlayerSymbol(player) {
    return (
        <Fragment>
            {player ? <img alt={player} width={30} src={require(
                player === "X" ? "./../img/btc.png" : "./../img/eth.png"
            )}/> : ""
            }
        </Fragment>
    )
}



function Board(props) {

    const [squares, setSquares] = React.useState(props.preloadGame ?? Array(9).fill(null))
    const [cpuPlayer, setCpuPlayer] = React.useState(randomizeCpuPlayer())

    useEffect(() => {
        if (props.onGameProgress instanceof Function) {
            //propagate gameProgress event to parent
            props.onGameProgress(squares);
        }
    }, [props, squares])

    function selectSquare(square, isHumanMoving = true) {

        //check if the move is valid
        if (square > 8 || winner || squares[square]) {
            return
        }

        //Check if is computer turn
        if (isHumanMoving && props.gameMode === "pvc" && cpuPlayer === nextValue) {
            return;
        }

        const _squares = [...squares]
        _squares[square] = nextValue
        setSquares(_squares)
    }

    function restart() {
        if (props.onNewGame instanceof Function) {
            //propagate newGame event to parent
            props.onNewGame(squares);
        }

        if (props.gameMode === "pvc") {
            setCpuPlayer(randomizeCpuPlayer());
        }
        setSquares(Array(9).fill(null))
    }
    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {renderPlayerSymbol(squares[i])}
            </button>
        )
    }


    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const canMove = anotherMoveAvailable(winner, squares, nextValue)


    //Is CPU turn?
    if (canMove && props.gameMode === "pvc" && cpuPlayer === nextValue) {
        //Simulate CPU thinking
        setTimeout(function () {
            selectSquare(findRandomSquare(squares), false);
        }, Math.floor(Math.random() * (1800 - 900 + 1) + 900))
    }

    return (
        <div>
            <div className="mt-2 h4"><h4>{retrieveStatusMessage(winner, squares, nextValue, cpuPlayer)}</h4></div>
            <div className="board-container mt-4">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
                <Button variant="primary" className="mt-5" onClick={restart}>
                    start a new game!
                </Button>
            </div>
        </div>

    )
}

export default Board;
