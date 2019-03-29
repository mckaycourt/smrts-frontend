import React, {
    Component
} from "react";
import M from "materialize-css";
import DataTable from "react-data-table-component";
import UploaderProgressBar from './UploaderProgressBar';

class Modal1 extends Component {
    constructor() {
        super();
        const columns = [
            {
                name: 'Header',
                selector: 'header',
                sortable: true,
            },
            {
                name: 'Required',
                cell: row => < div > {
                    row.required.toString()
                } < /div>,
                sortable: true,
            },
            {
                name: 'Description',
                selector: 'desc',
            }
        ];

        const infoTableTheming = {
            rows: {
                height: '34px'
            }
        };

        this.state = {
            percent: 1,
            showUploader: false,
            columns: columns,
            infoTableTheming: infoTableTheming,
            userName: 'Default User',
            simName: null,
            simType: 'Twitter'
        };
        this.handleChange = this.handleChange.bind(this);

    }

    //uploadHandlers are implmented here
    componentDidMount() {
        var table = [
            {
                header: 'created_at',
                required: 'true',
                desc: 'A javascript date object that shows the date and time the tweet was posted'
            },
            {
                header: 'id_str',
                required: true,
                desc: 'A unique identifier for the tweet'
            },
            {
                header: 'retweet_count',
                required: true,
                desc: 'Number of retweets this post has'
            },
            {
                header: 'favorite_count',
                required: true,
                desc: 'Number of favorites this post has'
            },
            {
                header: 'favorited',
                required: true,
                desc: 'Boolean (1 or 0) if the tweet has been favorited by you'
            }, {
                header: 'text',
                required: true,
                desc: 'The tweet text'
            },
            {
                header: 'description',
                required: true,
                desc: 'A brief description that the posting user has on their profile'
            },
            {
                header: 'followers_count',
                required: true,
                desc: 'Number of followers the posting user has'
            },
            {
                header: 'following',
                required: true,
                desc: 'Boolean (1 or 0) if you are following the posting user'
            },
            {
                header: 'statuses_count',
                required: true,
                desc: 'How many posts the posting user has made'
            },
            {
                header: 'name',
                required: true,
                desc: 'Real name of the user (John Smith)'
            },
            {
                header: 'screen_name',
                required: true,
                desc: 'The twitter handle of the user (@jsmith)'
            },
            {
                header: 'media_url',
                required: false,
                desc: 'URL of any images that have been attached to the post'
            },
            {
                header: 'typeof',
                required: false,
                desc: 'Whether the post has an "image" or a "video"'
            },
            {
                header: 'verified',
                required: true,
                desc: 'Boolean (1 or 0) whether the posting user has been verified by twitter'
            },
            {
                header: 'coordinates',
                required: false,
                desc: 'GPS coordinates for the post (-74.026675,40.683935)'
            },
            {
                header: 'reply',
                required: false,
                desc: 'As of March 28, 2019 this field is undefined...'
            }]
        this.setState({
            infoTable: table
        })

        //materialize init
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
        M.AutoInit();

        //uploader.listenOnSubmit(document.getElementById("my_button"), document.getElementById("siofu_input"));
    }

    handleSubmitClick = () => {
        console.log(this.state.simName);
        console.log(this.state.userName);
        console.log(this.state.simType);

        if (!this.state.simName) {
            M.toast({
                html: 'No Simulation Name',
                classes: 'red darken-1 rounded'
            });
            return
        }
        if (document.getElementById("siofu_input").files.length === 0) {
            M.toast({
                html: 'No File Attached',
                classes: 'red darken-1 rounded'
            });
            return
        }

        //declare functions needed to uploaded
        var self = this;

        const uploader = this.props.uploader;
        const socket = this.props.socket;

        uploader.addEventListener("start", function (event) {
            self.setState({
                showUploader: true
            });
            event.file.meta.simName = self.state.simName;
            event.file.meta.userName = self.state.userName;
            event.file.meta.simType = self.state.simType;
        });
        uploader.addEventListener("progress", function (event) {
            var percent = event.bytesLoaded / event.file.size * 100;
            console.log("File is", percent.toFixed(2), "percent loaded");
            self.setState({
                percent: percent
            })
        });
        uploader.addEventListener("complete", function (event) {
            console.log(event);
            setTimeout(function () {
                self.setState({
                    percent: 0,
                    showUploader: false
                })
            }, 600);
        });
        socket.on('upload status', function (data) {
            console.log(data)
            if (!data.status) {
                data.problem.forEach(function (element) {
                    if (element.includes('csv')) {
                        M.toast({
                            html: element,
                            classes: 'red darken-1 rounded'
                        });
                    } else {
                        M.toast({
                            html: "<strong>" + element + "</strong>' header is missing",
                            classes: 'red darken-1 rounded'
                        });
                    }
                });

            } else {
                M.Modal.getInstance(document.getElementById("modal1")).close();
                M.toast({
                    html: 'Saved Successfully!',
                    classes: 'green darken-1 rounded'
                });
                socket.emit('get list of sims', 'gimme gimme');
            }
            self.setState({
                showUploader: false
            });
        });
        //start upload
        uploader.submitFiles(document.getElementById("siofu_input").files);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return ( <
            div id = "modal1"
            className = "modal large" >
            <
            a href = "#!"
            className = "modal-close waves-effect waves-white pink lighten-0 btn-floating right modal-close-button" > < i className = "material-icons white-text" > close < /i></a >
            <
            div className = "modal-content" >
            <
            h4 > Upload Simulation < /h4>

            <
            div className = "section"
            style = {
                {
                    paddingBottom: 85
                }
            } >
            <
            UploaderProgressBar percent = {
                this.state.percent
            }
            show = {
                this.state.showUploader
            }
            /> <
            div className = "row" >
            <
            div className = "row" >
            <
            div className = "input-field col s6" >
            <
            input type = "text"
            className = "validate"
            value = {
                this.state.userName
            }
            disabled / >
            <
            label > User Name < /label> <
            /div> <
            div className = "input-field col s6" >
            <
            select defaultValue = {
                this.state.simType
            }
            onChange = {
                (val) => {
                    this.setState({
                        simType: val
                    });
                }
            } >
            <
            option value = "Twitter" > Twitter < /option> <
            /select> <
            label > Type of Simulation < /label> <
            /div> <
            /div> <
            div className = "row" >
            <
            div className = "input-field col s12" >
            <
            input className = "validated"
            name = "simName"
            type = "text"
            onChange = {
                this.handleChange
            }
            /> <
            label > Simulation Name < /label> <
            /div> <
            /div> <
            /div>

            <
            div className = "file-field input-field" >
            <
            div className = "btn blue darken-1" >
            <
            span > File < /span> <
            input type = "file"
            id = "siofu_input" / >
            <
            /div> <
            div className = "file-path-wrapper" >
            <
            input className = "file-path validate"
            type = "text" / >
            <
            /div> <
            /div> <
            button className = "btn waves-effect waves-light right blue darken-1"
            id = "my_button"
            onClick = {
                this.handleSubmitClick
            } > Submit <
            i className = "material-icons right" > send < /i> <
            /button> <
            /div>

            <
            div className = "divider" > < /div>

            <
            div className = "section"
            style = {
                {
                    paddingTop: 75
                }
            } >
            <
            h4 > How to Use Uploader < /h4> <
            p > Please ensure that you data is in a < strong > .csv format < /strong> before uploading. The columns headers must be formatted in the following way with data in every column.</p >
            <
            p > Here is a downloadable < a className = ''
            href = './content/smrts-template.csv'
            download > starter template < /a></p >
            <
            img src = "./img/modal-example.PNG"
            alt = "csv example"
            className = "materialboxed responsive-img" / >
            <
            /div>


            <
            div className = "section" >
            <
            DataTable title = "Accepted Fields"
            columns = {
                this.state.columns
            }
            data = {
                this.state.infoTable
            }
            overflowY = {
                true
            }
            responsive = {
                true
            }
            customTheme = {
                this.state.infoTableTheming
            }
            highlightOnHover /
            >
            <
            /div> <
            /div> <
            div className = "modal-footer" >

            <
            /div> <
            /div>
        );
    }
}

export default Modal1;
