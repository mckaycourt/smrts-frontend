import {Component} from "react";
import React from "react";

class FloatingModalButton extends Component {
    render() {
        return (
            <div className="fixed-action-btn">
                <button className="btn-floating btn-large pink">
                    <i className="waves-effect waves-light large material-icons modal-trigger" href="#modal1">add</i>
                </button>
                <ul>
                    <li><a className="waves-effect waves-light btn-floating blue modal-trigger tooltipped" data-position="top" data-tooltip="Join a Room" href="#modal2"><i className="material-icons">event</i></a></li>
                </ul>
            </div>
        );
    }
}

export default FloatingModalButton;


/*
  <!-- Element Showed -->
  <a id="menu" class="waves-effect waves-light btn btn-floating" ><i class="material-icons">menu</i></a>

  <!-- Tap Target Structure -->
  <div class="tap-target" data-target="menu">
    <div class="tap-target-content">
      <h5>Title</h5>
      <p>A bunch of text</p>
    </div>
  </div>

    var elems = document.querySelectorAll('.tap-target');
    var instances = M.TapTarget.init(elems, options);
*/