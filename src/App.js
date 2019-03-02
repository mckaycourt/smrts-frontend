import React, {Component} from "react";
import Sim from './components/Sim';
import SimListApp from './components/Sim-List-App';
import UploadModal from './components/UploadModal';
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
                <UploadModal/>

            </>
        );
    }
}

export default App;