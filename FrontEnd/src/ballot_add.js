// This is the componenet for imputing informaiton about a ballot for a plurality vote

import React from "react";
import Popup from "reactjs-popup";
import styled from 'styled-components'

// CSS for some of the componenets
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
        this.selectElement = this.selectElement.bind(this);
        this.state = {candidate: "", votes: ''};
    }

    // A popup is triggered when a button is pressed, this popup has to display everything
    // that is required for a vote, that being the candidate that has been voted for and the 
    // number of people that voted for that candidate
    render() {
        return(
        <Popup trigger={<Ballotaddbutton>Add Ballot</Ballotaddbutton>} modal>
            {close => (
            <Customselected>
                <div>
                <select className="styledselect" id="candidateSelect" onChange={this.onSelectCandidate}>
                    <option disabled selected value={1}> -- select an option -- </option>
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

    // when they select a candidate store their selection in the state
    onSelectCandidate() {
        var e = document.getElementById("candidateSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.setState({candidate: strUser});
    }

    // When they input a number store their selection in the state
    onNumberChange(e) {
        this.setState({ votes: e.target.value });
    }

    //Helper function
    isNumeric(value){
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    selectElement(id, valueToSelect) {    
        let element = document.getElementById(id);
        element.value = valueToSelect;
        
    }

    // this is called when they press the button to complete the ballot
    add_ballot(){
        // error check against non numerics
        if(!this.isNumeric(this.state.votes)){
            return
        }

        //create a new ballot with the candidate they chose and the votes
        // id needs to be different for every object using the current time ensures this
        const newBallot = {
            candidate: this.state.candidate,
            votes: this.state.votes,
            id: Date.now()
        };

        //reset the states and inputs
        this.setState(state => ({
            votes: "",
            candidate: "",
        }));
        this.selectElement("candidateSelect", "1");

        // call the method to add the ballot in the main file
        this.props.add_ballot(newBallot);
        
    }
}

export default BallotEddit;