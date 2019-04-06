import React from 'react';
import '../CSS/Slider.css'
import M from 'materialize-css';

class Slider extends React.Component {
    state = {
        playPause: false,
    };
    
    componentDidMount() {
        //makes the hovering thing
        var elems  = document.querySelectorAll("input[type=range]"); 
        M.Range.init(elems);
    }
    
    handleChange = (event, value) => {
        this.setState({value: event.target.value});
    };
    
    play = () => {
        const socket = this.props.socket;
        this.setState({playPause: false});
        let room = this.props.room;
        socket.emit('play', room);
        console.log("play clicked");
        M.toast({html: 'Simulation Resumed', classes: 'green darken-2 rounded'})
    }

    pause = () => {
        const socket = this.props.socket;
        console.log(this.props.room);
        let room = this.props.room
        this.setState({playPause: true});
        socket.emit('pause', room);
        console.log("pause clicked");
        M.toast({html: 'Simulation Paused', classes: 'red darken-3 rounded text-center'})
    }

    render() {
        return (
            <div className="card fixed-slider align-scrubber">
                <div className="playPause">
                    {this.state.playPause && <input type="image" onClick={this.play} className="playPause" src="./img/play.png"/>}
                    {!this.state.playPause && <input type="image" onClick={this.pause} className="playPause" src="./img/pause.png"/>}
                </div>
                <div className="slidecontainer">
                    <input 
                        type="range" 
                        min="1" 
                        max={this.props.max}
                        value={this.props.value}
                        className="scrubber"
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    };
}

export default Slider;

//https://www.w3schools.com/howto/howto_js_rangeslider.asp
//https://materializecss.com/range.html
//        