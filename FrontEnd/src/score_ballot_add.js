import React from "react";
import Popup from "reactjs-popup";

class BallotEdditScore extends React.Component {
    constructor(props){
        super(props);
        this.state = {candidates: [], ballot:[], candidate:"",score:"", votes:""};
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
        this.add_candidate = this.add_candidate.bind(this);
        this.generate_list = this.generate_list.bind(this);
        this.selectElement = this.selectElement.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.complete_ballot = this.complete_ballot.bind(this);
        this.onSelectRank = this.onSelectRank.bind(this);
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
                            <li key={ball.id}>{ball.candidate}: {ball.score}</li>
                        ))}
                    </ul>
                </div>
                <h3>{this.state.rank}
                <select id="candidateSelect" onChange={this.onSelectCandidate}>
                    
                    <option disabled selected value={1}> -- select a candidate -- </option>
                    {select_values.map(item => (
                        <option key={item.id}>{item.text}</option>
                    ))}
                    
                </select>
                <select id="rankSelect" onChange={this.onSelectRank}>
                    <option disabled selected value={0}> -- select a score -- </option>
                    <option key={1}>1</option>
                    <option key={2}>2</option>
                    <option key={3}>3</option>
                    <option key={4}>4</option>
                    <option key={5}>5</option>
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

    onSelectRank(){
        var e = document.getElementById("rankSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.setState({score: strUser});
    }

    onSelectCandidate() {
        var e = document.getElementById("candidateSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.setState({candidate: strUser});
    }
    
    selectElement(id, valueToSelect) {    
        let element = document.getElementById(id);
        element.value = valueToSelect;

        let scoreelement = document.getElementById("rankSelect");
        scoreelement.value = 0;
        
    }
    add_candidate(){
        var writeto = this.state.ballot;

        if((this.state.candidate === "")||(this.state.score === "")){
            return;
        }
        const newBallot = {
            candidate: this.state.candidate,
            score: this.state.score,
            id: Date.now()
        };
        writeto = writeto.concat(newBallot);
        this.setState(state => ({
            
            ballot: writeto,
            score:  "",
            candidate: "",
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

        this.setState(state => ({
        
            ballot: [],
            score:  '',
            candidates: [],
            votes: '',
        }));

        this.props.add_ballot(finalballot);
    }
    
}

export default BallotEdditScore;