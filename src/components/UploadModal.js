import React, {
    Component
} from 'react';
import openSocket from 'socket.io-client';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import WebFont from 'webfontloader';
import '../CSS/UploadModal.css'; 

const socket = openSocket('http://localhost:3000');

class UploadButton extends Component {
  render() {
   return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large pink">
                <i className="waves-effect waves-light large material-icons modal-trigger" href="#modal1">add</i>
            </a>
            <ul>
                <li><a className="waves-effect waves-light btn-floating blue modal-trigger tooltipped" data-position="top" data-tooltip="Join an event" href="#modal2"><i className="material-icons">event</i></a></li>
            </ul>
        </div>   
    );
 }
}

class Modal1 extends Component {
    constructor() {
        super();
        this.state = {
            percent: 0,
            showUploader: false
        };
    }

    /*put in the functionality for the table*/
    
    render() {
       return (
           <div id="modal1" className="modal large">
                <a href="#!" className="modal-close waves-effect waves-white pink lighten-0 btn-floating right modal-close-button"><i className="material-icons white-text">close</i></a>
                <div className="modal-content">
                    <h4>Upload Simulation</h4>
                    <div className="section">
                        <p>Please ensure that you data is in a <strong>.csv format</strong> before uploading. The columns headers must be formatted in the following way with data in every column.</p>
                         <img src="./img/modal-example.PNG" alt="csv example" className="materialboxed responsive-img" />
                    </div>
                    <div className="section">
                        <h5>Accepted Fields</h5>
                        <div></div>
                    </div>
                    <form action="#">
                        <div className="blue darken-2 progress">
                            <div className="blue lighten-4 indeterminate"></div>
                        </div>
                        <div className="file-field input-field">
                            <div className="blue darken-2 btn">
                                <span>File</span>
                                <input type="file" />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </form>
               </div>
              <div className="modal-footer">
                <button className="btn waves-effect waves-light blue darken-2 right" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
              </div>
           </div>
        );
    }
}

class UploadModal extends Component {
    constructor() {
        super();
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
        return (            
            <div>
                <UploadButton />
                <Modal1 />
            </div>
        )
    }
}


export default UploadModal;


/*
var uploader = new SocketIOFileUpload(socket);
uploader.listenOnSubmit(document.getElementById("my_button"), document.getElementById("siofu_input"));
uploader.addEventListener("start", function (event) {
    event.file.meta.hello = "world";
    $('.progress').show();
});
uploader.addEventListener("progress", function (event) {
    var percent = event.bytesLoaded / event.file.size * 100;
    $('.determinate').css({
        "width": percent + "%"
    });
    console.log("File is", percent.toFixed(2), "percent loaded");
});
uploader.addEventListener("complete", function (event) {
    $('.progress').fadeOut('slow');
});

socket.on('connect', function () {

    socket.on('upload status', function (data) {
        console.log(data)
    });
}
*/

/*
<div id="modal1" className="modal large">
            <a href="#!" className="modal-close waves-effect waves-white pink lighten-0 btn-floating right" style="margin:25px"><i className="material-icons white-text">close</i></a>
            <div className="modal-content">
                <h4>Upload Simulation</h4>
                <div className="section">
                    <p>Please ensure that you data is in a <strong>.csv format</strong> before uploading. The columns headers must be formatted in the following way with data in every column.</p>
                    <img className="materialboxed" width="100%" src="./modal-example.PNG">
                </div>
                <div className="section">
                    <h5>Accepted Fields</h5>
                    <div id="tableAndDefination" style="height: 350px;margin-bottom: 50px;   overflow-y: scroll; width: 100%"></div>
                </div>
                <form action="#">
                    <div className="blue darken-2 progress">
                        <div className="blue lighten-4 indeterminate"></div>
                    </div>
                    <div className="file-field input-field">
                        <div className="blue darken-2 btn">
                            <span>File</span>
                            <input type="file">
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text">
                        </div>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button className="btn waves-effect waves-light blue darken-2 right" type="submit" name="action" style="margin: 10px 30px">Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>



*/

