import React from "react";

function UploaderProgressBar(props) {
    if (!props.show) {
        return null;
    }

    return (
        <div className="blue lighten-4 progress">
            <div className="blue darken-2 determinate" style={{"width" : props.percent+"%"}}/>
        </div>
    );
}

export default UploaderProgressBar;