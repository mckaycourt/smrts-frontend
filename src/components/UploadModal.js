import React, {
    Component
} from 'react';
import openSocket from 'socket.io-client';
import DataTable from 'react-data-table-component';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import WebFont from 'webfontloader';
import '../CSS/UploadModal.css'; 
var SocketIOFileUpload = require('socketio-file-upload');

const socket = openSocket('http://localhost:3000');
var uploader = new SocketIOFileUpload(socket);

class FloatingModalButton extends Component {
  render() {
   return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large pink">
                <i className="waves-effect waves-light large material-icons modal-trigger" href="#modal1">add</i>
            </a>
            <ul>
                <li><a className="waves-effect waves-light btn-floating blue modal-trigger tooltipped" data-position="top" data-tooltip="Join a Room" href="#modal2"><i className="material-icons">event</i></a></li>
            </ul>
        </div>   
    );
 }
}

class Modal1 extends Component {
    constructor() {
        super();
        const columns = [
            {
                name: 'Header',
                selector: 'header',
                sortable: true,
            },
            {
                name: 'Required',
                cell: row => <div>{row.required.toString()}</div>,
                sortable: true,
            },
            {
                name: 'Description',
                selector: 'desc',
            }
        ];
        const infoTableTheming = {
          rows: {
            height: '34px'
          }
        }
        this.state = {
            percent: 1,
            showUploader: false,
            columns:columns,
            infoTableTheming: infoTableTheming,
            userName: 'Default User',
            simName: null,    
            simType: 'Twitter'
        };
        this.handleChange = this.handleChange.bind(this);

    }

    //uploadHandlers are implmented here
    componentDidMount() {
        var table = [
            {
                header: 'created_at',
                required: 'true',
                desc: 'this is a description'
            },
            {
                header: 'id_str',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'retweet_count',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'favorite_count',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'favorited',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'description',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'followers_count',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'following',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'statuses_count',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'name',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'screen_name',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'media_url',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'typeof',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'verified',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'coordinates',
                required: true,
                desc: 'this is a description'
            },
            {
                header: 'reply',
                required: true,
                desc: 'this is a description'
            }]
        this.setState({infoTable: table})

        //materialize init
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        M.AutoInit();

        uploader.listenOnSubmit(document.getElementById("my_button"), document.getElementById("siofu_input"));
    }

    handleSubmitClick = () => {
        var self=this;
        console.log(this.state.simName)
        console.log(this.state.userName)
        console.log(this.state.simType);

        if(!this.state.simName){
            M.toast({html: 'No Simulation Name', classes: 'red darken-1 rounded'});
            return
        }
        if(document.getElementById("siofu_input").files.length == 0){
            M.toast({html: 'No File Attached', classes: 'red darken-1 rounded'});
            return
        }
        this.setState({showUploader: true});
        uploader.addEventListener("start", function (event) {
            event.file.meta.simName = this.state.simName;
            event.file.meta.userName = this.state.userName;
            event.file.meta.simType = this.state.simType;
        });
        uploader.addEventListener("progress", function (event) {
            var percent = event.bytesLoaded / event.file.size * 100;
            console.log("File is", percent.toFixed(2), "percent loaded");
            self.setState({percent: percent})
        });
        uploader.addEventListener("complete", function (event) {
            setTimeout(function(){ 
                self.setState({percent: 0,showUploader:true}) 
            }, 600);
        });
        socket.on('upload status', function (data) {
            console.log(data)
            if(!data.status){
                data.problem.forEach(function(element) {
                    if(element.includes('csv')){
                        M.toast({html: element, classes: 'red darken-1 rounded'});
                    } else{
                        M.toast({html: "<strong>"+element+"</strong>' header is missing", classes: 'red darken-1 rounded'});
                    }
                });

            } else{
                M.toast({html: 'Upload Complete!', classes: 'green darken-1 rounded'});
            }
            console.log(data);
            this.setState({showUploader: false});
        });  
    }

      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });      
      }

    render() {
       return (
           <div id="modal1" className="modal large">
                <a href="#!" className="modal-close waves-effect waves-white pink lighten-0 btn-floating right modal-close-button"><i className="material-icons white-text">close</i></a>
                <div className="modal-content">
                    <h4>Upload Simulation</h4>
           
                    <div className="section" style={{paddingBottom: 85}}>
                        <UploaderProgressBar percent={this.state.percent} show={this.state.showUploader} />
                          <div className="row">
                              <div className="row">
                                <div className="input-field col s6">
                                  <input type="text" className="validate" value={this.state.userName} disabled />
                                  <label>User Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <select defaultValue={this.state.simType} onChange={(val) => {this.setState({simType: val});}}>
                                      <option value="Twitter">Twitter</option>
                                    </select>
                                    <label>Type of Simulation</label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="input-field col s12">
                                  <input className="validated" name="simName" type="text" onChange={this.handleChange} />
                                  <label>Simulation Name</label>
                                </div>
                              </div>
                          </div>

                            <div className="file-field input-field">
                                <div className="btn blue darken-1">
                                    <span>File</span>
                                    <input type="file" id="siofu_input" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light right blue darken-1" id="my_button" onClick={this.handleSubmitClick}>Submit
                                <i className="material-icons right">send</i>
                            </button>
                    </div>
           
                    <div className="divider"></div>

                    <div className="section" style={{paddingTop: 75}}>
                        <h4>How to Use Uploader</h4>
                        <p>Please ensure that you data is in a <strong>.csv format</strong> before uploading. The columns headers must be formatted in the following way with data in every column.</p>
                         <img src="./img/modal-example.PNG" alt="csv example" className="materialboxed responsive-img" />
                    </div>
           
           
                    <div className="section">
                        <DataTable
                            title="Accepted Fields"
                            columns={this.state.columns}
                            data={this.state.infoTable}
                            overflowY={true}
                            responsive={true}
                            customTheme={this.state.infoTableTheming}
                        />
                    </div>
               </div>
              <div className="modal-footer">

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
                <FloatingModalButton />
                <Modal1 />
            </div>
        )
    }
}

function UploaderProgressBar(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="blue lighten-4 progress">
        <div className="blue darken-2 determinate" style={{"width" : props.percent+"%"}}></div>
    </div>
  );
}

export default UploadModal;






/*
            <div class="file-field input-field">
                <div class="btn">
                    <span>File</span>
                    <input type="file" id="siofu_input" />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                </div>
            </div>
            <button class="btn waves-effect waves-light right" id="my_button">Submit
                <i class="material-icons right">send</i>
            </button>



                <button id="my_button" className="btn waves-effect waves-light blue darken-2 right" onClick={this.handleSubmitClick}>Submit
                    <i className="material-icons right">send</i>
                </button>


}






*/




