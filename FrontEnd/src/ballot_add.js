import React from "react";
import Popup from "reactjs-popup";
import styled from 'styled-components'

const Customselected = styled.div`
    .styledselect{
        margin-top: 15px;
        width: 60%;
        margin-bottom: 10px;
        border-radius: 5px;
        font-size: 1.7rem;
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


    .customInput{
        
        margin-top: 5px;
        margin-bottom: 10px;
        border-radius: 5px;
        font-size: 1.7rem;
        border: 0.5px solid black;
    }

    .customButton{
        border-radius: 5px;
        float: left;
        border: 0.5px solid black;
    }

    .customPopup{
        background: blue;
    }


`;

const Ballotaddbutton = styled.button`
    border-radius: 5px;
    border: 0.5px solid black; 
    height: 40px;
    width: 100px;

`;


class BallotEddit extends React.Component {

    constructor(props){
        super(props);
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.state = {candidate: "", votes: ''};
    }

    render() {
        return(
        <Popup trigger={<Ballotaddbutton>Add Ballot</Ballotaddbutton>} modal>
            {close => (
            <Customselected>
                <div>
                <select className="styledselect" id="candidateSelect" onChange={this.onSelectCandidate}>
                    <option disabled selected value> -- select an option -- </option>
                    {this.props.candidates.map(item => (
                        <option key={item.id}>{item.text}</option>
                    ))}
                    
                </select>
                </div>
                <div>
                <input className="customInput" type="number" id="candidateVotes" onChange={this.onNumberChange} value={this.state.votes}></input>
                </div>
                <div>
                <button className="customButton" onClick={() => this.add_ballot()} disabled={!this.state.candidate}>Add ballot</button>
                </div>
                <a className="close" onClick={close}>
                &times;
                </a>
            </Customselected>
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