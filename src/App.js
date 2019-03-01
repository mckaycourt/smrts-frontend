import React, {Component} from "react";
import Sim from './components/Sim';
import SimListApp from './components/Sim-List-App';
import './CSS/Navbar.css';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <>
                <SimListApp/>
                <Sim/>
            </>
        );
    }
}

export default App;