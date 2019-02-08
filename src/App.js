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