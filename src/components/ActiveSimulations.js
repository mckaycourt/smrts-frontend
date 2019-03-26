import React, {Component} from 'react'
import DataTable from 'react-data-table-component';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
var moment = require('moment');


class ActiveSimulations extends Component {
    constructor() {
        super();
        this.state = {roomsList:[]};
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
                name: 'Date Uploaded',
                selector: 'time',
                format: row => moment(row.time).format('lll'),
                sortable: true,
                right: true
            }
        ];
        this.state = {columnsConfig:columnsConfig}
    }

    componentDidMount() {
        const socket = this.props.socket;        
        socket.on('get list of rooms', data => {
            this.setState({
                roomsList: data
            })
        });
        socket.on('join room', function (data) {
            console.log('joining room', data);
            M.toast({html: 'Room joined: '+ data, classes: 'green darken-2 rounded'})
        });

        this.setState({
            socket
        })
    }

    rowClick = (properties) => {
        console.log(properties);
        this.requestJoinRoom(properties.name)
        this.props.changeView();
    }

    requestJoinRoom = (name) => {
        const {socket} = this.state;
        var roomName = name;
        console.log('request to join room', roomName)
        socket.emit('join room', roomName);
    }

    deleteAllRooms = () => {
        const {socket} = this.state;
        socket.emit('delete all rooms', '');
    }

    render() {
        const roomsList = this.state.roomsList;

        return (
            <div id="modal2" className="modal bottom-sheet">
            <div className="modal-content">
                    <h3 className="header">Simulations in Progress <button onClick={this.deleteAllRooms} className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">delete_sweep</i></button>
                    </h3>
                    <DataTable
                        columns={this.state.columnsConfig}
                        data={roomsList}
                        highlightOnHover
                        defaultSortField="time"
                        responsive={true}
                        striped={true}
                        pointerOnHover={true}
                        className={'simsInProgress'}
                        defaultSortAsc={false}
                        onRowClicked={this.rowClick}
                    />
            </div>
        </div>

        )
    }
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


