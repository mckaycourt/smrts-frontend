import React, {Component} from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            data: [],
            endpoint: "http://127.0.0.1:3000",
        };
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }
  
    handleUploadImage(ev) {
      ev.preventDefault();
  
      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('filename', this.fileName.value);
  
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        console.log(response);
        // response.json().then((body) => {
        //   this.setState({ imageURL: `http://localhost:3001/${body.file}` });
        // });
      });
    }
  

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);

        socket.on("tweet", data => {
            this.setState({
                    response: true,
                }
            );
            console.log(data);
            let prevData = this.state.data;
            prevData.push(data);
            this.setState({
                prevData,
            });
        });

        socket.on('join room', data => {
            console.log('join room -> ', data);
            let prevData = this.state.data;
            prevData.push('join ' + data);
            this.setState({
                prevData,
            });
        });

        this.setState({
            socket
        })
    }

    joinRoom = () => {
        const {socket} = this.state;
        socket.emit('join room', 'room1');
    };

    addTweet = () => {
        let prevData = this.state.data;
        prevData.push('testing');
        this.setState({
            data: prevData,
        })
        // this.state.data.push('testing');
    };

    render() {
        const {response} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                <form onSubmit={this.handleUploadImage}>
                    <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </div>
                    <div>
                    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                    </div>
                    <br />
                    <div>
                    <button>Upload</button>
                    </div>
                    <img src={this.state.imageURL} alt="img" />
                </form>
                <br></br>
                <hr></hr>
                <button onClick={this.joinRoom}>Join Room</button>
                <button onClick={this.addTweet}>Add Tweet</button>
                {
                    response
                        ?
                        <div>
                            {
                                this.state.data.map((tweet, i) => (
                                    <p key={i}>{tweet}</p>
                                ))
                            }
                        </div>
                        : <p>Loading...</p>}
            </div>
        );
    }
}

export default App;