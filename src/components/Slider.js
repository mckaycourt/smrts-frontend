import React from 'react';
import '../CSS/Slider.css'

class Slider extends React.Component {
    state = {
        value: 20,
    };

    handleChange = (event, value) => {
        this.setState({value: event.target.value});
    };

    render() {
        return (
            <div className="card">
                <div className="slidecontainer">
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={this.state.value} 
                        className="slider" id="myRange" 
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    };
}

export default Slider;