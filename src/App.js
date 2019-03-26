import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import Navbar from './components/Navbar';
import Sim from './components/Sim';
import SimListApp from './components/Sim-List-App';
import ActiveSimulations from './components/ActiveSimulations';

import './CSS/Navbar.css';
import UploadModal from "./components/UploadModal";

class App extends Component {
    constructor() {
        super();
        this.state = {
            simListStyle: {
                display: 'block',
            },
            simStyle: {
                display: 'none',
            },
        }
    }

    changeView = () => {
        this.setState({
            simListStyle: {
                display: 'none',
            },
            simStyle: {
                display: 'block',
            }
        })
    };

    render() {
        const endpoint = "http://127.0.0.1:3000";
        const socket = socketIOClient(endpoint);
        return (
            <>
                <Navbar/>
                <div style={this.state.simStyle}>
                    <Sim socket={socket}/>
                </div>
                <div style={this.state.simListStyle}>
                    <SimListApp changeView={this.changeView} socket={socket}/>
                    <ActiveSimulations socket={socket}/>
                    <UploadModal socket={socket}/>
                </div>
            </>
        );
    }
}

export default App;