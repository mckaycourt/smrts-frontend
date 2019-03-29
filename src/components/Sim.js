import React, {Component} from 'react';
import Tweets from '../components/Tweets';
import Slider from './Slider';


class Sim extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            data: [],
            max: 100,
        }
    }

    componentDidMount() {
        const socket = this.props.socket;
        // console.log(Slider.state.value);

        socket.on("tweet", data => {
            this.setState({
                    response: true,
                }
            );
            console.log(data);
            let prevData = this.state.data;
            prevData.push(data);
        });

        socket.on("results", data => {
            console.log('results', data);
            this.setState({
                response: true,
                data: data[0].simulation,
            });
        });

        socket.on('join room', data => {
            console.log('join room -> ', data);
            // let prevData = this.state.data;
            // prevData.push('join ' + data);
            // this.setState({
            //     prevData,
            // });
        });

        socket.on('max tweets', data => {
            this.setState({
                max: data,
            })
        })
    }


    joinRoom = () => {
        const {socket} = this.props;
        socket.emit('join room', 'default room');
    };

    addTweet = () => {
        let prevData = this.state.data;
        prevData.push('testing');
        this.setState({
            data: prevData,
        })
    };

    style = {
        paddingBottom: '100px',
    };

    render() {
        const res =  this.state.response;
        
        return (
            <div style={this.style}>
                <Tweets data={this.state.data}/>
                <div style={this.props.scrubStyle}>
                    <Slider max={this.state.max} value={this.state.data.length}/>
                </div>
            </div>
        )
    }
}

export default Sim;



