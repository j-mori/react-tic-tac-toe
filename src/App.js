import {Route, Routes} from 'react-router-dom'
import {Col, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css';
import Game from "./component/Game";
import Menu from "./component/Menu";
import History from "./component/History";



function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Tic tac toe!</h1>
            </header>
            <Routes>
                <Route exact path="/" element={<Menu/>}/>
                <Route path="/play/pvp" element={<Game gameMode="pvp" />}/>
                <Route path="/play/pvc" element={<Game gameMode="pvc" />}/>
                <Route path="/history" element={<History/>}/>
            </Routes>
        </div>
    );
}

export default App;
