import React, {Component} from 'react';
import Tweets from '../components/Tweets';
import Slider from './Slider';


class Sim extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            data: [],
            total: 100,
        }
    }

    componentDidMount() {
        const socket = this.props.socket;

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
        return (
            <div>
                <button onClick={this.joinRoom}>Join Room</button>
                <button onClick={this.addTweet}>Add Tweet</button>
                <Tweets data={this.state.data}/>
                <Slider/>
            </div>
        )
    }
}

export default Sim;