import React, {
    Component
} from 'react';
import Tweets from '../components/Tweets';
import Slider from './Slider';
import M from "materialize-css";


class Sim extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            data: [],
            max: 100,
            room: null
        }
    }

    componentDidMount() {
        const socket = this.props.socket;
        // console.log(Slider.state.value);

        socket.on("tweet", data => {
            this.setState({
                response: true,
            });
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
            this.setState({
                room: data
            })
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
        });

        socket.on('session ended', data => {
            toast('Simulation session has ended');
            setTimeout(function () {
                toast('You will receive no more tweets')
            }, 4000);
            setTimeout(function () {
                toast('Please consider creating a session of your own')
            }, 7500);

            function toast(text) {
                M.toast({
                    html: text,
                    classes: 'red darken-1 rounded'
                });
            }
        })
    }


    joinRoom = () => {
        const {
            socket
        } = this.props;
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
        const res = this.state.response;

        return ( <
            div style = {
                this.style
            } >
            <
            Tweets data = {
                this.state.data
            }
            /> <
            div style = {
                this.props.scrubStyle
            } >
            <
            Slider max = {
                this.state.max
            }
            value = {
                this.state.data.length
            }
            socket = {
                this.props.socket
            }
            room = {
                this.state.room
            }
            /> < /
            div > <
            /div>
        )
    }
}

export default Sim;
