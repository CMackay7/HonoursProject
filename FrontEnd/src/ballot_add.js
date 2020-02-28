import React from "react";
import Popup from "reactjs-popup";

class BallotEddit extends React.Component {

    constructor(props){
        super(props);
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.state = {candidate: "", votes: ''};
    }

    render() {
        return(
        <Popup trigger={<button>Add Ballot</button>} position="top left">
            {close => (
            <div>
                <select id="candidateSelect" onChange={this.onSelectCandidate}>
                    <option disabled selected value> -- select an option -- </option>
                    {this.props.candidates.map(item => (
                        <option key={item.id}>{item.text}</option>
                    ))}
                    
                </select>
                <input type="number" id="candidateVotes" onChange={this.onNumberChange} value={this.state.votes}></input>
                <button onClick={() => this.add_ballot()} disabled={!this.state.candidate}>Add ballot</button>
                <a className="close" onClick={close}>
                &times;
                </a>
            </div>
            )}
        </Popup>
        )
    }

    onSelectCandidate() {
        var e = document.getElementById("candidateSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.setState({candidate: strUser});
    }

    onNumberChange(e) {
        this.setState({ votes: e.target.value });
    }

    isNumeric(value){
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    add_ballot(){

        if(!this.isNumeric(this.state.votes)){
            return
        }
        const newBallot = {
            candidate: this.state.candidate,
            votes: this.state.votes,
            id: Date.now()
        };
        this.setState(state => ({
            
            votes: "",
        }));


        
        this.props.add_ballot(newBallot);
        
    }
}

export default BallotEddit;