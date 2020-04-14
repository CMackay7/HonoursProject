import React from "react";
import Popup from "reactjs-popup";
import styled from 'styled-components'

const StyledPopup = styled.div`


.styledSelect {
    width: 60%;

}

    .close {
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
}

.customul {

    list-style-type: none;
    font-size: 1.5rem;
    
}

    .selectbuttondiv{
        padding: 5px;
        margin-left: auto;
        margin-right: auto;

    }
    .custombutton{
        background: white;
        border: none;
        height: 20px;
        
    }
`;

const Custombutton = styled.button`

    border-radius: 5px;
    border: 0.5px solid black; 
    height: 40px;
    width: 100px;

`;




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

    
// To add a ranked ballot a popup needs to be shown.
// In the popup there has to be a dropdown to select a cadidate
// a button to add the candidate to the ballot and the number of votes recieved
    render(){

        var select_values = this.generate_list();
        return(
            <Popup trigger={<Custombutton>Add Ballot</Custombutton>} modal>
            {close => (

            <StyledPopup>
                <div>
                    <ul className="customul">
                        {this.state.ballot.map(ball => (
                            <li key={ball.id}>{ball.rank}: {ball.candidate}</li>
                        ))}
                    </ul>
                </div>
                <h3>{this.state.rank}.
                <div className="selectbuttondiv" >
                    <select className="styledSelect" id="candidateSelect" onChange={this.onSelectCandidate}>
                        
                        <option disabled selected value={1}> -- select an option -- </option>
                        {select_values.map(item => (
                            <option key={item.id}>{item.text}</option>
                        ))}
                         
                    </select>
                    <button className="custombutton" onClick={() => this.add_candidate()}>
                    <ion-icon  name="add-outline" size="large"></ion-icon>
                    </button>
                </div>
                </h3>
                <div className="selectbuttondiv">
                <input type="number" id="candidateVotes" onChange={this.onNumberChange} value={this.state.votes}></input>
                <button onClick={() => this.complete_ballot()} >Add ballot</button>
                </div>
                <a className="close" onClick={close}>
                &times;
                </a>
            </StyledPopup>
            )}
        </Popup>
        )
    }

    // when they select a candidate in the dropdown it needs to be stored in the state
    onSelectCandidate() {
        var e = document.getElementById("candidateSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.setState({candidate: strUser});
    }
    
    // this is used to reset the select bar
    selectElement(id, valueToSelect) {    
        // when the value is set to 1 it will display -- select an option --
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    // add a candidate to the state 
    add_candidate(){
        var writeto = this.state.ballot;
        // check the user has entered values 
        if((this.state.candidate === "")||(this.state.rank ==="")){
            return;
        }
        //create the ballot object 
        const newBallot = {
            candidate: this.state.candidate,
            rank: this.state.rank,
            id: Date.now()
        };

        //Add it to the state 
        writeto = writeto.concat(newBallot);
        this.setState(state => ({
            
            ballot: writeto,
            rank:  (this.state.rank + 1),
            // increase the rank so the next candidate is added in the correct place
            candidates: this.state.candidates.concat(this.state.candidate),
        }));

        //Reset the select
        this.selectElement("candidateSelect", "1");
    }

    // Store the number of votes
    onNumberChange(e) {
        this.setState({ votes: e.target.value });
    }

    // Generate the list of candidates to have in the dropdown
    // This is because if a candidate has been added it should 
    // be removed form the dropdown so the user cannot select the same candidate again
    generate_list(){
        var select_values = this.props.candidates;
        var addedcands = this.state.candidates;
        var outlist = []

        for (var i = 0; i < select_values.length; i++){
            //addedcands stores the candidates, so only the candidates 
            // which have not already been added are allowed to be selected 
            if(!(addedcands.includes(select_values[i].text))){
                
                outlist = outlist.concat(select_values[i]);
            }
        }
        return outlist;
    }

    complete_ballot(){
        if((this.state.votes === "") || (this.state.ballot.length === 0)){
            return;
        }
        
        const finalballot = {
            ballot: this.state.ballot,
            votes: this.state.votes,
            id: Date.now()
        };

        this.setState(state => ({
            
            ballot: [],
            rank:  1,
            candidates: [],
            votes: '',
        }));

        this.props.add_ballot(finalballot);
    }
    
}

export default BallotEdditRanked;