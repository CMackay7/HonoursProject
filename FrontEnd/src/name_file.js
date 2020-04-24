import React from "react";
import Popup from "reactjs-popup";

import styled from 'styled-components'

// Css for buttons 
const CustonButton = styled.button`
    border-radius: 5px;
    padding: 2px;
    border: 0.5px solid black;
    margin-right: 3%;
`;

class NameFile extends React.Component {

    constructor(props){
        super(props);
        this.saveFile = this.saveFile.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.state = {filename: ""};
    }




    // this popup displays an input box where the user inputs the name of the file and a button
    // when pressed it will download a file with that name
    render() {
        return(
        <Popup trigger={<CustonButton>Download File</CustonButton>} position="top left">
            {close => (
            <div>
                <input id="candidateVotes" placeholder="Enter the filename" onChange={this.onNumberChange} value={this.state.filename}></input>
                <CustonButton onClick={() => this.saveFile()} disabled={!this.state.filename}>Save</CustonButton>

            </div>
            )}
        </Popup>
        )
    }

    // When the user inputs and text it auto saves the updates
    onNumberChange(e) {
        this.setState({ filename: e.target.value });
    }

    // when the user presses the download file it returns the file name for it to be downloaded
    saveFile(){
        var filename = this.state.filename;
        this.setState(state => ({
            
            filename: "",

        }));
        var filename = filename + ".txt";
        this.props.save(filename);
    }
    


}

export default NameFile;