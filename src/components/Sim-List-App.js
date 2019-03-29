import React, {Component} from 'react'
import DataTable from 'react-data-table-component';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '../CSS/Sim-List-App.css';
import M from 'materialize-css';
var moment = require('moment');


class SimListApp extends Component {
    constructor(props) {
        super(props);
        //table properties
        const columnsConfig = [
            {
                name: 'Simulation',
                selector: 'nameOfSim',
                sortable: true,
                minWidth:'40%'
            },
            {
                name: 'Type',
                selector: 'type',
                sortable: true,
                cell: row => <div>{row.type}</div>
            },
            {
                name: 'User',
                selector: 'user',
                sortable: true,
                right: false,
            },
            {
                name: 'Date Uploaded',
                selector: 'date',
                format: row => moment(row.date).format('lll'),
                sortable: true,
                right: true,
            }
        ];

        this.state = {
            simExist: false,
            data: null,
            columnsConfig: columnsConfig
        }
    }

    rowClick = (properties) => {
        console.log(properties);
        this.requestCreateRoom(properties.nameOfSim, properties.type);

        // const socket = this.props.socket;
        // socket.emit('click', properties);
        this.props.changeView();
        this.props.changeAdmin();
    };

    componentDidMount() {
        const socket = this.props.socket;

        socket.on('get list of sims', data => {
            console.log(data);
            this.setState({
                simExist: true,
                data: data
            })
        });
        socket.on('create room', function (data) {
              M.toast({html: 'Room created: '+ data, classes: 'green darken-1 rounded'})
        });

        this.setState({
            socket
        })
    }

    requestCreateRoom = (roomName, type) => {
        const {socket} = this.state;
        socket.emit('create room', roomName, type);
    };

    render() {
        const receivedSimulation = this.state.simExist;
        const simulationData = this.state.data;

        return (
            <div className="SimList">
                {receivedSimulation ? (
                    <DataTable
                        pagination
                        paginationRowsPerPageOptions={[10, 25, 50]}
                        columns={this.state.columnsConfig}
                        data={simulationData}
                        selectableRows
                        highlightOnHover
                        defaultSortField="date"
                        responsive={true}
                        striped={true}
                        pointerOnHover={true}
                        className={'container'}
                        onRowClicked={this.rowClick}
                        defaultSortAsc={false}
                    />
                ) : (
                    <div dangerouslySetInnerHTML={returnLoader()}/>
                )}
            </div>
        )
    }
}

export default SimListApp;


function returnLoader() {
        var loaderHTML = `  
        <div class="center-align">  
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>`;


    return {__html: loaderHTML}
}
