import React, {Component} from 'react'
import openSocket from 'socket.io-client';
import DataTable from 'react-data-table-component';


const socket = openSocket('http://localhost:3000');

function getSimList(list) {
    socket.on('get list of sims', function (data) {
        console.log('getting list of sims');
        setTimeout(() => {
            list(conformDates(data))
        }, 1500)
    });

    function conformDates(allData) {
        var returnArray = [];
        allData.forEach(function (element) {
            element.date = new Date(element.date).toDateString();
            returnArray.push(element)
        })
        return returnArray
    }
}

function returnLoader() {
    var loaderHTML = `    
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>`;


    return {__html: loaderHTML}
}

function rowClick(properties) {
    console.log(properties);
}

//table properties
var spacing = 10;
const columnsConfig = [
    {
        name: 'Simulation',
        selector: 'nameOfSim',
        sortable: true,
    },
    {
        name: 'Type',
        selector: 'type',
        sortable: true,
        cell: row => <div>{row.type}</div>
    },
    {
        name: 'User',
        selector: 'date',
        sortable: true,
        right: false,
    },
    {
        name: 'Date Uploaded',
        selector: 'date',
        sortable: true,
        right: true,
    },
    {
        name: 'Views',
        selector: 'views',
        sortable: true,
        right: true
    }
];

const selectStyle = {
    display: 'inline',
    border: '1px solid #ada9a9!important',
};

class SimListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            simExist: false,
            data: null
        }
    }

    componentDidMount() {
        getSimList((incomingData) => {
            console.log(incomingData);
            this.setState({
                simExist: true,
                data: incomingData
            })
        });
    }

    getSims =() => {
        socket.emit('get list of sims');
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
                        columns={columnsConfig}
                        data={simulationData}
                        selectableRows
                        highlightOnHover
                        defaultSortField="year"
                        responsive={true}
                        striped={true}
                        pointerOnHover={true}
                        className={'container'}
                        onRowClicked={rowClick}
                    />
                ) : (
                    <div dangerouslySetInnerHTML={returnLoader()}/>
                )}

                <button onClick={this.getSims}>Get Sims</button>
            </div>
        )
    }
}


export default SimListApp


/*
NEED TO INCLUDE THIS CSS IN THE COMPONENT
select{
    display: inline;
    border: 1px solid #ada9a9!important;
}
*/



