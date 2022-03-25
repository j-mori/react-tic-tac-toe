import React, {useEffect} from 'react';
import '../css/Game.css';
import {calculateWinner} from "../utils/common";

function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function retrieveStatusMessage(winner, squares, nextValue) {
    return winner
        ? `Congrats to ${winner} 🎉`
        : squares.every(Boolean)
            ? `Perfectly balanced as all things should be`
            : `Next player: ${nextValue}`
}

function anotherMoveAvailable(winner, squares) {
    return winner
        ? false
        : !squares.every(Boolean)
}

function randomizeCpuPlayer() {
    const rnd = Math.floor(Math.random() * 2);
    if(rnd===0){
        return "X"
    }else{
        return "O";
    }
}

function findRandomSquare(squares){
    let rnd;
    do{
        rnd = Math.floor(Math.random() * 9);
    }while(squares[rnd])
    return rnd;
}



function Board(props) {

    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [cpuPlayer, setCpuPlayer] = React.useState(randomizeCpuPlayer())

    useEffect(() => {
        if(props.onGameProgress instanceof Function){
            props.onGameProgress(squares);
        }
    },[squares])

    useEffect(() => {
        console.log(props.squaresSetup);
        if(props.squaresSetup){
            setSquares(props.squaresSetup)
        }
    },[])

    function selectSquare(square,isHumanMoving=true) {
        if (winner || squares[square]) {
            return
        }
        if(isHumanMoving && props.gameMode === "pvc" && cpuPlayer === nextValue){
            return;
        }

        const _squares = [...squares]
        _squares[square] = nextValue
        setSquares(_squares)
    }

    function restart() {
        if(props.onNewGame instanceof Function){
            props.onNewGame(squares);
        }
        if(props.gameMode==="pvc"){
            setCpuPlayer(randomizeCpuPlayer());
        }
        setSquares(Array(9).fill(null))
    }

    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
        )
    }


    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const canMove = anotherMoveAvailable(winner, squares, nextValue)


    //Is CPU turn?
    if(canMove && props.gameMode === "pvc" && cpuPlayer === nextValue){
        //Simulate CPU thinking
        setTimeout(function (){
            selectSquare(findRandomSquare(squares),false);
        },Math.floor(Math.random() * (1800 - 900 + 1) + 900))
    }

    return (
        <div>
            <div className="mt-2"><h4>{retrieveStatusMessage(winner, squares, nextValue)}</h4></div>
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
                <button className="restart" onClick={restart}>
                    new game!
                </button>
            </div>
        </div>

    )
}

export default Board;
