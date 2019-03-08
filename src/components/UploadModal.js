import React, {
    Component
} from 'react';
import openSocket from 'socket.io-client';
import DataTable from 'react-data-table-component';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import WebFont from 'webfontloader';
import '../CSS/UploadModal.css';
import FloatingModalButton from './FloatingModalButton';
import Modal1 from './Modal1';
import Modal2 from './Modal2';


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
        var instances = M.FloatingActionButton.init(elems, {direction:'left'});
        M.AutoInit();
    }

    render() {
        //socket stuff
        let SocketIOFileUpload = require('socketio-file-upload');
        const socket = this.props.socket;
        let uploader = new SocketIOFileUpload(socket);
        return (            
            <div>
                <FloatingModalButton />
                <Modal1 socket={socket} uploader={uploader}/>
                <Modal2 />
            </div>
        )
    }
}

export default UploadModal;