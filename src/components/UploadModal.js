import React, {
    Component
} from 'react';
// import openSocket from 'socket.io-client';
// import DataTable from 'react-data-table-component';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import WebFont from 'webfontloader';
import '../CSS/UploadModal.css';
import FloatingModalButton from './FloatingModalButton';
import Modal1 from './Modal1';
// import Modal2 from './Modal2';
// import UploaderProgressBar from './UploaderProgressBar';





//socket stuff
// var SocketIOFileUpload = require('socketio-file-upload');


class UploadModal extends Component {
    constructor(props) {
        super(props);
        WebFont.load({
          google: {
            families: ['Material Icons', 'sans-serif']
          }
        });
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {direction:'left'});
        M.AutoInit();

        const socket = this.props.socket;
        this.setState({
            socket 
        })
    }

    render() {
        const socket = this.props.socket;
        let SocketIOFileUpload = require('socketio-file-upload');
        let uploader = new SocketIOFileUpload(socket);
        
        return (    
            <div>
                <FloatingModalButton />
                <Modal1 socket={socket} uploader={uploader}/>
            </div>
        )
    }
}

export default UploadModal;