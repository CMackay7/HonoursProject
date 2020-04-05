import React from "react";
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

class BallotList extends React.Component {

  constructor(props){
    super(props);
    this.deleteBallot = this.deleteBallot.bind(this);
    this.state = {candidate: "", votes: ''};
}

    render(){
        return(
          <StyledDiv>
            <ul>
            {this.props.ballots.map(item => (
              <li className="customli" key={item.id} >{item.candidate} = {item.votes}
              <button className="invisbutton" onClick={() => this.deleteBallot(item.candidate)}>
              <p className="customp">Delete</p>
              </button></li>
            ))}
          </ul>
          </StyledDiv>
        )
    }

    deleteBallot(candidatename){
      var place = 0;
      for(var i = 0; i < this.props.ballots.length; i++){
        //console.log("vsfdsvsdv: " + this.props.ballots[i].candidate)
        if(candidatename === this.props.ballots[i].candidate){
          place = i;
          break;
        }
      }
      
      this.props.deleteballot(place);
    }
}

export default BallotList;
  