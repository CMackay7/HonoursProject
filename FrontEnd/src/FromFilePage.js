// This is the page to load and run an election from file
import React from 'react';
import history from './history';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { JumbotronFromFile } from './components/Jumbotron_From_file';
import { Layout } from './components/Layout';
import JSONPretty from 'react-json-pretty';

const CustomButton = styled.button`
    margin-top: 10px;
    border-radius: 5px;
    padding: 2px;
    border: 0.5px solid black;
    margin-right: 3%;

`;

const Button = styled.button`
    font-family: sans-serif;
    font-size: 1.3rem;
    background: #405CC6;
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background: #6D6968;
    }
`;


class FromFilePage extends React.Component{
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            data: "",
            displayData: ""
          }
       
          this.onChangeHandler = this.onChangeHandler.bind(this);
          this.sendback = this.sendback.bind(this);
          this.readfiles = this.readfiles.bind(this);
          this.onChangeHandler = this.onChangeHandler.bind(this);
          this.sendapi = this.sendapi.bind(this);
    }

    // have a file input which reads the file when it is selected by the user
    // JSONPretty diaplays the json from file ordered 
    render() {  
        return(        
            <nav>
                <JumbotronFromFile/>
                <Layout>
                <input id="input" placeholder="Enter the filename" type="file" onChange={() => this.onChangeHandler()}></input>
                <JSONPretty id="json-pretty" data={this.state.displayData}></JSONPretty>
                <CustomButton disabled={!this.state.data} onClick={() => this.sendapi()}>Run Election</CustomButton>
                </Layout>
            </nav>
        );
    }

    sendapi(){
        // go to the results page and send the data that needs to be sent to the 
        // server
        var object = this.state.data
        var objects = object.split("|");
        var objtosend = JSON.parse(objects[1]);
        console.log(objects[0]);
        history.push({
            pathname: '/results',
            state: {
              id: Date.now(),
              json: JSON.stringify(objtosend),
              urltouse: objects[0]
            }});
            window.location.reload()
    
    }

    //Call here when the user selects a file
    onChangeHandler(){
        var file = document.getElementById('input').files[0];
        console.log(file);
        
        this.readfiles(file, function(datain){
            var objects = datain.split("|");

            this.setState(state => ({
            displayData: objects[1],
            data: datain,
      }));}.bind(this));
        console.log(this.state.data)

    }

    // Read the data from the file
    readfiles(file, callback){
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
            var data = fileReader.result
    
            callback(data);
        };

        fileReader.readAsText(file)
    }

    sendback(data){
        console.log("this worked if: ");
        console.log(data)
    }
}

export default FromFilePage;