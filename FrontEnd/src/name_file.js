import React from "react";
import Popup from "reactjs-popup";

import styled from 'styled-components'

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

    onNumberChange(e) {
        this.setState({ filename: e.target.value });
    }

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