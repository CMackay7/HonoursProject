import React from 'react';
import {Link} from 'react-router-dom'

class CandidateToWin extends React.Component {

    constructor(props){
        super(props);
        this.state = {candidates: [], ballot:[], candidate:"",score:"", votes:""};
        this.onSelectCandidate = this.onSelectCandidate.bind(this);
    }

    render(){
        return(
            <div>     
                <h3>Which candidate do you want to win?</h3>
                <select id="candtowinSelect" onChange={this.onSelectCandidate}>
                <option disabled selected value={0}> -- select a candidate to win -- </option>
                    {this.props.candidates.map(item => (
                        <option key={item.id}>{item.text}</option>
                    ))}
                </select>
            </div>
        );
    }

    onSelectCandidate(){
        var e = document.getElementById("candtowinSelect");
        var strUser = e.options[e.selectedIndex].value;

        
        this.props.set_candidate_to_win(strUser);
    }
}

export default CandidateToWin;