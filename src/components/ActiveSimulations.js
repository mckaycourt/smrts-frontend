import React, {Component} from 'react'
import DataTable from 'react-data-table-component';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
var moment = require('moment');


class ActiveSimulations extends Component {
    constructor() {
        super();
        this.state = {roomsList:[]};

    }

    componentDidMount() {
        const socket = this.props.socket;        
        socket.on('get list of rooms', data => {
            this.setState({
                roomsList: data
            })
        });
        socket.on('join room', function (data) {
            console.log('joining room', data)
        });
        socket.on('create room', function (data) {
            console.log('room has been created', data)
        });

        this.setState({
            socket
        })
    }


    requestJoinRoom = () => {
        const {socket} = this.state;
        var roomName = "default room";
        console.log('request to join room', roomName)
        socket.emit('join room', roomName);
    }

    requestCreateRoom = () => {
        const {socket} = this.state;
        var roomName = "new room";
        console.log('creating room', roomName)
        socket.emit('create room', roomName);
    }


    render() {
        const roomsList = this.state.roomsList;

        return (
            <div>
                <button onClick={this.requestCreateRoom}>
                    Create Room
                </button>
                <Modal2 roomsList={roomsList} />
            </div>

        )
    }
}

function Modal2(props){
    const columnsConfig = [
        {
            name: 'Simulation Name',
            selector: 'name',
            sortable: true,
            minWidth:'50%'
        },
        {
            name: 'Type',
            selector: 'type',
            sortable: true,
            cell: row => <div>{row.type}</div>
        },
        {
            name: 'Time Started',
            selector: 'date',
            format: row => moment(row.time).format('llll'),
            sortable: true,
            right: true,
        }
    ];
    const fakeData =[{name:'data',time:new Date(),type:'Twitter'}]
    console.log(props)
    
    return (
            <div id="modal2" className="modal bottom-sheet">
            <div className="modal-content">
                <div className="modal-content">
                    <h3 className="header">Simulations in Progress</h3>
                    <DataTable
                        columns={columnsConfig}
                        data={props.roomsList}
                        highlightOnHover
                        defaultSortField="time"
                        responsive={true}
                        striped={true}
                        pointerOnHover={true}
                        className={''}
                    />
                  </div>
            </div>
        </div>
    )
}

export default ActiveSimulations;

/*
                    <ul className="collection">
                     <li className="collection-item avatar">
                        <i className="material-icons circle">assignment_ind</i>
                        <span className="title">Simulation Name</span>
                        <p>Meta Data</p>
                      </li>
                      <li className="collection-item avatar">
                        <i className="material-icons circle">folder</i>
                        <span className="title">Simulation Name</span>
                        <p>Meta Data</p>
                      </li>
                    </ul>
*/


