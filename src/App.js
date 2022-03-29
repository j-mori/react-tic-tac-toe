import {Route, Routes, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css';
import Game from "./component/Game";
import Menu from "./component/Menu";
import History from "./component/History";



function App() {
    const navigate = useNavigate()

    return (
        <div className="app">
            <header className="app-header">
                <h1 onClick={() => {navigate('/')}} className="app-title">Tic tac toe!</h1>
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
