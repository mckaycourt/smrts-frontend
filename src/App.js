import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import Slider from "bootstrap-slider";

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

        var slider = new Slider("#ex6");
        // Without JQuery
        slider.on("slide", function(sliderValue) {
            document.getElementById("ex6SliderVal").textContent = sliderValue;
        });

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
                <div>
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
                <div>
                    <input id="ex6" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="3"/>
                    <span id="ex6CurrentSliderValLabel">Current Slider Value: <span id="ex6SliderVal">3</span></span>
                </div>
            </div>
        );
    }
}

export default App;