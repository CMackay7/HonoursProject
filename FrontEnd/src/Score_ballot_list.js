import React from "react"
import styled from 'styled-components'

const StyledDiv = styled.div`
  .invisbutton{
    border:none;
    background: white;
    
    height:15px;
  }

  ion-icon{
    font-size: 32px;
    
    color: #c41313;
  }

  .customli{
    width: 300px;
    position:relative;

    font-size: 1.5rem;
  }

  .customp{
    font-size: 1rem;
    &:hover {
        text-decoration: underline;
        
    }
  }
`;

class ScoreBallotList extends React.Component {

  constructor(props){
    super(props);
    this.deleteBallot = this.deleteBallot.bind(this);
    this.ballot_to_string = this.ballot_to_string.bind(this);

    this.state = {candidate: "", votes: ''};
}

    render(){
        const display_string = this.ballot_to_string();
        return(
            <StyledDiv>
            <ul>
            {display_string.map(item => (
                <li className="customli" key = {item.place}> {item.displaystring}
                <button className="invisbutton" onClick={() => this.deleteBallot(item.place, display_string)}>
                    <p className="customp">delete</p>
                </button>
                </li>
            ))}
          </ul>
          </StyledDiv>
        )
    }

    deleteBallot(id, display_string){
        var place = 0
        for(var i = 0; i < display_string.length; i++){
            if(this.props.ballots[i].id === id){
                place = i;
                break;
            }
        }
        this.props.deleteballot(place);
    }

    ballot_to_string(){
        var ballots = this.props.ballots;
        var returndict = [];
        
        for(var i = 0; i < ballots.length; i++){
            var current_ballot = ballots[i];
            
            var returnstring = "";
            var currentbreakdown = current_ballot.ballot

            for(var x = 0; x < current_ballot.ballot.length; x++){
                var curruse = currentbreakdown[x]
                
                returnstring = returnstring+ "  " + (curruse.candidate + ": " + curruse.score)
                
            }

            returnstring = returnstring + " = " + current_ballot.votes;
            
            const newitem = {
                displaystring: returnstring,
                place: current_ballot.id,
                id: Date.now()
            };

            returndict = returndict.concat(newitem);
        }

        return returndict;
    }
}

export default ScoreBallotList;
  