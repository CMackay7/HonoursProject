import React from "react";
import Popup from "reactjs-popup";

class BallotEdditRanked extends React.Component {
    constructor(props){
        super(props);
        this.state = {candidates: [], ballot:[], rank: 1, candidate:"", votes:""};
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
        this.add_candidate = this.add_candidate.bind(this);
        this.generate_list = this.generate_list.bind(this);
        this.selectElement = this.selectElement.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.complete_ballot = this.complete_ballot.bind(this);
    }

    render(){

        var select_values = this.generate_list();
        return(
            <Popup trigger={<button>Add Ballot</button>} position="top left">
            {close => (

            <div>
                <div>
                    <ul>
                        {this.state.ballot.map(ball => (
                            <li key={ball.id}>{ball.rank}: {ball.candidate}</li>
                        ))}
                    </ul>
                </div>
                <h3>{this.state.rank}
                <select id="candidateSelect" onChange={this.onSelectCandidate}>
                    
                    <option disabled selected value={1}> -- select an option -- </option>
                    {select_values.map(item => (
                        <option key={item.id}>{item.text}</option>
                    ))}
                    
                </select>
                <button onClick={() => this.add_candidate()}>add</button>
                </h3>
                <input type="number" id="candidateVotes" onChange={this.onNumberChange} value={this.state.votes}></input>
                <button onClick={() => this.complete_ballot()} >Add ballot</button>
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
    
    selectElement(id, valueToSelect) {    
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }
    add_candidate(){
        var writeto = this.state.ballot;
        if((this.state.candidate === "")||(this.state.rank ==="")){
            return;
        }
        const newBallot = {
            candidate: this.state.candidate,
            rank: this.state.rank,
            id: Date.now()
        };
        writeto = writeto.concat(newBallot);
        this.setState(state => ({
            
            ballot: writeto,
            rank:  (this.state.rank + 1),
            candidates: this.state.candidates.concat(this.state.candidate),
        }));

        this.selectElement("candidateSelect", "1");
    }
    onNumberChange(e) {
        this.setState({ votes: e.target.value });
    }

    generate_list(){
        var select_values = this.props.candidates;
        var addedcands = this.state.candidates;
        var outlist = []

        for (var i = 0; i < select_values.length; i++){
            if(!(addedcands.includes(select_values[i].text))){
                
                outlist = outlist.concat(select_values[i]);
            }
        }
        console.log(outlist);
        return outlist;

    }

    complete_ballot(){
        if(this.state.votes === ""){
            return;
        }
        
        const finalballot = {
            ballot: this.state.ballot,
            votes: this.state.votes,
            id: Date.now()
        };

        console.log(finalballot);
    }
    
}

export default BallotEdditRanked;