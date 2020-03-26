import React from "react";
import Popup from "reactjs-popup";

class NameFile extends React.Component {

    constructor(props){
        super(props);
        this.saveFile = this.saveFile.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.state = {filename: ""};
    }




    
    render() {
        return(
        <Popup trigger={<button>Download File</button>} position="top left">
            {close => (
            <div>
                <input id="candidateVotes" placeholder="Enter the filename" onChange={this.onNumberChange} value={this.state.filename}></input>
                <button onClick={() => this.saveFile()} disabled={!this.state.filename}>Save</button>

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
        alert("hello");
        var filename = filename + ".txt";
        this.props.save(filename);
    }
    


}

export default NameFile;