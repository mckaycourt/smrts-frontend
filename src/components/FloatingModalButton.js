import {Component} from "react";
import React from "react";

class FloatingModalButton extends Component {
    render() {
        return (
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large pink">
                    <i className="waves-effect waves-light large material-icons modal-trigger" href="#modal1">add</i>
                </a>
                <ul>
                    <li><a className="waves-effect waves-light btn-floating blue modal-trigger tooltipped" data-position="top" data-tooltip="Join a Room" href="#modal2"><i className="material-icons">event</i></a></li>
                </ul>
            </div>
        );
    }
}

export default FloatingModalButton;