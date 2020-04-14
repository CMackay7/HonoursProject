// This is the componenet that allows the user to select which candidate they want to win
import React from 'react';
import styled from 'styled-components'

const Customselected = styled.div`
    .customselect{
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
`;

class CandidateToWin extends React.Component {

    constructor(props){
        super(props);
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
    }

    // Render a drop down option box which contains every candidate
    render(){
        return(
            <Customselected>     
                <h3>Which candidate do you want to win?</h3>
                <select className="customselect" id="candtowinSelect" onChange={this.onSelectCandidate}>
                <option disabled selected value={0}> -- select a candidate to win -- </option>
                    {this.props.candidates.map(item => (
                        <option key={item.id}>{item.text}</option>
                    ))}
                </select>
            </Customselected>
        );
    }

    // This function is called when the user selects a candidate it calls the setter
    // in the main file
    onSelectCandidate(){
        var e = document.getElementById("candtowinSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.props.set_candidate_to_win(strUser);
    }
}

export default CandidateToWin;