import React, {Component} from 'react'
import DataTable from 'react-data-table-component';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '../CSS/Sim-List-App.css';
var moment = require('moment');


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

function rowClick(properties) {
    console.log(properties);
}

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

    componentDidMount() {
        const socket = this.props.socket;

        socket.on('get list of sims', data => {
            console.log(data);
            this.setState({
                simExist: true,
                data: data
            })
        });
        
        this.setState({
            socket
        })
    }

    // getSims = () => {
    //     socket.emit('get list of sims');
    // };

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
                        className={''}
                        onRowClicked={rowClick}
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