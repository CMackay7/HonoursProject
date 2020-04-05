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
        if((this.state.votes === "") || (this.state.ballot === [])){
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