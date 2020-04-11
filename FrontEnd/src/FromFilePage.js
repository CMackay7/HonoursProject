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

    readfiles(file, callback){
        var fileReader = new FileReader();

        // 3. This function will be called when readAsArrayBuffer() has
        // finished reading the file 
        fileReader.onloadend = function(e) {
            var data = fileReader.result
    
            callback(data);
        };

        fileReader.readAsText(file)
    }

    // onChangeHandler=event=>{
    //     //let file = event.target.files[0];
    //     //console.log(file);
    //     let data = document.getElementById('input').files[0];
    //     var filereader = new FileReader();
    //     filereader.readAsText(data)
    //     var databack = ""
    //     filereader.onload = function() {
    //         //console.log("look here");
    //         //console.log(filereader.result)
            
    //         databack = filereader.result;
    //     };
    //     console.log(filereader.onload())
    //     if (!(databack === "")){
    //         this.sendback(databack);
    //     }
    //     console.log(filereader.result);
    //     //data.append('file', file)
    //     console.log(data)

    // }

    sendback(data){
        console.log("this worked if: ");
        console.log(data)
    }
}

export default FromFilePage;