import React from 'react';
import '../CSS/Slider.css'

class Slider extends React.Component {
    state = {
        playPause: false,
    };


    handleChange = (event, value) => {
        this.setState({value: event.target.value});
    };

    play = () => {
        this.setState({playPause: false});
        console.log("play clicked");
    }

    pause = () => {
        this.setState({playPause: true});
        console.log("pause clicked");
    }

    render() {
        return (
            <div className="card fixed-action-btn">
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