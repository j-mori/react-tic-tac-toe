import React from 'react';
import {Col, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/App.css';
import {calculateWinner} from "../utils/common";
import { useNavigate } from "react-router-dom";

function  getGamesHistory(){
    let gamesHistory;
    try{
        gamesHistory = JSON.parse(localStorage.getItem('gamesHistory'))
    }catch (e){}
    return gamesHistory ?? [];
}

function calculateGameResult(squares){
    squares = squares ?? [];
    const winner = calculateWinner(squares ?? []);
    return winner ? winner : squares.every(Boolean) ? "Draw" : "Uncompleted"
}

function History() {

    const navigate = useNavigate()

    function navigateToGameReplay(squaresSetup){
        navigate("/play/pvp",{
            state:{"preloadGame":squaresSetup}
        })
    }

    function renderHistoryRow(game){
        return (
            <Row className="game-history-row" onClick={navigateToGameReplay(game.squaresSetups)}>
                <Col>
                    {new Date(game.datetime).toLocaleString()}
                </Col>
                <Col>
                    Game result: {calculateGameResult(game.squaresSetups)}
                </Col>
                <Col>
                    Game Mode: {game.gameMode.toUpperCase()}
                </Col>
            </Row>
        )
    }

    const gamesHistory = getGamesHistory();
    if(!gamesHistory.length){
        return (
            <h4 className="mt-4">No game history found</h4>
        )
    }

    return (
        <div className="mt-4 history-container">
            <h4 className="mt-4">Games history</h4>
            <span>Revive the most exciting moments of your last 30 games</span>
            <i>Click a match to replay it!</i>
            <div>
                {gamesHistory.map((item,index)=>{
                    return <div key={index} className="mt-4">{renderHistoryRow(item)}</div>
                })}
            </div>
        </div>
    )
}

export default History;
