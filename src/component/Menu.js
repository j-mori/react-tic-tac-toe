import React from 'react';
import {Button, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/App.css';
import { useNavigate } from "react-router-dom";

function Menu() {
    let navigate = useNavigate();
    return(
        <div className="mt-lg-5">
            <h2>Menu</h2>
            <div className="menu">
                <Row className="p-2">
                    <Button className="p-3" onClick={() => navigate('/play/pvp')} variant="primary">PvP</Button>
                </Row>
                <Row className="p-2">
                    <Button className="p-3" onClick={() => navigate('/play/pvc')} variant="success">PvC</Button>
                </Row>
                <Row className="p-2">
                    <Button className="p-3" onClick={() => navigate('/history')} variant="secondary">History</Button>
                </Row>
            </div>
        </div>
    );
}

export default Menu;
