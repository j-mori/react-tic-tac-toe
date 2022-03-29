import React, {useEffect} from 'react';
import '../css/App.css';
import Board from "./Board";
import {useLocation} from "react-router-dom";


function Game(props) {

    const gameMode = props.gameMode ?? 'pvc';
    // Save current game progress in local storage
    function saveGameProgress(squaresSetup){
        const currentGame = JSON.parse( localStorage.getItem('currentGame') ??  '{}')
        currentGame[gameMode] = {'squaresSetups':squaresSetup}
        localStorage.setItem('currentGame',JSON.stringify(currentGame))
    }

    //Save the game in the game history local storage
    function saveGamesHistory(squaresSetup){
        let gamesHistory = [];
        try{
            gamesHistory = JSON.parse(localStorage.getItem('gamesHistory'))
        }catch (e){}
        gamesHistory = gamesHistory ?? [];
        //save the more recent game on top of the array, max 30 games
        gamesHistory = [{
            datetime:Date.now(),
            gameMode: props.gameMode,
            squaresSetups:squaresSetup
            },
            ...gamesHistory].slice(0,30)
        localStorage.setItem('gamesHistory',JSON.stringify(gamesHistory))
    }

    const { state } = useLocation();

    //retrieve last game from local storage
    let preloadGame;

    if(state && state.preloadGame){
        preloadGame = state.preloadGame
    }else{
        try{
            preloadGame = JSON.parse(localStorage.getItem('currentGame'))[gameMode].squaresSetups
        }catch (e){}
    }
    preloadGame = preloadGame ?? Array(9).fill(null);
    return (
        <div>
            <Board gameMode={gameMode} preloadGame={preloadGame} onNewGame={saveGamesHistory} onGameProgress={saveGameProgress} />
        </div>
    );
}

export default Game
