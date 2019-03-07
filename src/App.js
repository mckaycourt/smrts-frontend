import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import Sim from './components/Sim';
import SimListApp from './components/Sim-List-App';
import './CSS/Navbar.css';
import UploadModal from "./components/UploadModal";


class App extends Component {
    constructor() {
        super();
    }

    render() {
        const endpoint = "http://127.0.0.1:3000";
        const socket = socketIOClient(endpoint);
        return (
            <>
                <SimListApp socket={socket}/>
                <Sim socket={socket}/>
                <UploadModal/>
            </>
        );
    }
}

export default App;