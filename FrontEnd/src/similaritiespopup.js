import React from "react";
import Popup from "reactjs-popup";

class SimilarPopup extends React.Component {

    constructor(props){
        super(props);

        this.state = {similarity: ''};
        this.onNumberChange = this.onNumberChange.bind(this);
    }

    render(){
        return(
            <Popup trigger={<button>Add Ballot</button>} position="top left">
            {close => (
            <div>
                <input type="number" id="candidateVotes" onChange={this.onNumberChange} value={this.state.similarity} max="10"></input>
                <button onClick={() => this.props.handleUpdate(this.props.value, this.state.similarity)} disabled={!this.state.similarity}>Add ballot</button>
                <a className="close" onClick={close}>
                &times;
                </a>
            </div>
            )}
        </Popup>
        )
    }

    onNumberChange(e) {
        var sim = e.target.value;
        if(!(Number(sim) > 10)){
            this.setState({ similarity: e.target.value });
        }
        
    }
}

export default SimilarPopup;