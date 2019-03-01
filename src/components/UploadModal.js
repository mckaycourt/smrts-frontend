import React, {Component} from 'react';
import socketIOClient from "socket.io-client"; 



function initModal(){
   $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton({direction: 'left'});
    $('.tooltipped').tooltip();
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.materialboxed').materialbox();
      
        M.AutoInit();
  }); 
}



    <!-- floating action btn-->
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large pink">
            <i class="waves-effect waves-light large material-icons modal-trigger" href="#modal1">add</i>
        </a>
        <ul>
            <li><a class="waves-effect waves-light btn-floating blue modal-trigger tooltipped" data-position="top" data-tooltip="Join an event" href="#modal2"><i class="material-icons">event</i></a></li>
        </ul>
    </div>


    <!-- upload modal -->
    <div id="modal1" class="modal large">
        <a href="#!" class="modal-close waves-effect waves-white pink lighten-0 btn-floating right" style="margin:25px"><i class="material-icons white-text">close</i></a>
        <div class="modal-content">
            <h4>Upload Simulation</h4>
            <div class="section">
                <p>Please ensure that you data is in a <strong>.csv format</strong> before uploading. The columns headers must be formatted in the following way with data in every column.</p>
                <img class="materialboxed" width="100%" src="./modal-example.PNG">
            </div>
            <div class="section">
                <h5>Accepted Fields</h5>
                <div id="tableAndDefination" style="height: 350px;margin-bottom: 50px;   overflow-y: scroll; width: 100%"></div>
            </div>
            <form action="#">
                <div class="blue darken-2 progress">
                    <div class="blue lighten-4 indeterminate"></div>
                </div>
                <div class="file-field input-field">
                    <div class="blue darken-2 btn">
                        <span>File</span>
                        <input type="file">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn waves-effect waves-light blue darken-2 right" type="submit" name="action" style="margin: 10px 30px">Submit
                <i class="material-icons right">send</i>
            </button>
        </div>
    </div>



<script>
    var html = `<table class="striped responsive-table">
                <thead>
                    <tr>
                        <th>Header</th>
                        <th>Definition</th>
                        <th>Required</th>
                    </tr>
                </thead><tbody>`;



    var data = getSimFields()[0];
    var keys = getSimFields()[1];

    $.each(keys, function(index, value) {
        var required = data[value].required;
        var desc = data[value].desc;
        
        html+= `<tr>
                <td>`+keys[index]+`</td>
                <td>`+desc+`</td>
                <td>`+required+`</td>
            </tr>`
        console.log(data[value])
        console.log(keys[index])
    });

    html += `</tbody></table>`

    $('#tableAndDefination').append(html)


    function getSimFields() {
        var loopsyData = {
            created_at: {
                required: true,
                desc: 'this is a description'
            },            id_str: {
                required: true,
                desc: 'this is a description'
            },            retweet_count: {
                required: true,
                desc: 'this is a description'
            },            favorite_count: {
                required: true,
                desc: 'this is a description'
            },            favorited: {
                required: true,
                desc: 'this is a description'
            },            description: {
                required: true,
                desc: 'this is a description'
            },            followers_count: {
                required: true,
                desc: 'this is a description'
            },            following: {
                required: true,
                desc: 'this is a description'
            },            statuses_count: {
                required: true,
                desc: 'this is a description'
            },            name: {
                required: true,
                desc: 'this is a description'
            },            screen_name: {
                required: true,
                desc: 'this is a description'
            },            media_url: {
                required: true,
                desc: 'this is a description'
            },            typeof: {
                required: true,
                desc: 'this is a description'
            },            verified: {
                required: true,
                desc: 'this is a description'
            },            coordinates: {
                required: true,
                desc: 'this is a description'
            },            reply: {
                required: true,
                desc: 'this is a description'
            },
        }

        var keys = [];
        for (var k in loopsyData) keys.push(k);


        return [loopsyData, keys]
    }

</script>