import React from 'react';
import {Link} from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'; 
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
        this.state = {candidates: [], ballot:[], candidate:"",score:"", votes:""};
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
    }

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

    onSelectCandidate(){
        var e = document.getElementById("candtowinSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.props.set_candidate_to_win(strUser);
    }
}

export default CandidateToWin;