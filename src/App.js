import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import Tweet from './components/Tweet';
import SimListApp from './Sim-List-App';
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
        socket.emit('join room', 'default room');
    };

    addTweet = () => {
        let prevData = this.state.data;
        prevData.push('testing');
        this.setState({
            data: prevData,
        })
    };

    render() {
        const {response} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                <SimListApp/>
                <button onClick={this.joinRoom}>Join Room</button>
                <button onClick={this.addTweet}>Add Tweet</button>
                {
                    response
                        ?
                        <div>
                            {
                                this.state.data.map((tweet, i) => (
                                    tweet[0] && tweet[0].user
                                        ?
                                        <Tweet username={tweet[0].user.name}
                                               body={tweet[0].text}
                                               retweet={tweet[0].retweet_count}
                                               createdAt={tweet[0].created_at}
                                               key={i}/>
                                        : <p key={i}>something went wrong. Received: {tweet}</p>
                                ))
                            }
                        </div>
                        : <p>Join a Room!</p>}
            </div>
        );
    }
}

export default App;