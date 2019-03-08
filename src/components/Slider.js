import React from 'react';
import '../CSS/Slider.css'

class Slider extends React.Component {
    state = {
        value: 50,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        console.log({value});
    };

    render() {
        const { value } = this.state;
        return (
            <div className="slidecontainer">
                <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={value} 
                    className="slider" id="myRange" 
                    onChange={this.handleChange}
                />
            </div>
        );
    };
}

export default Slider;