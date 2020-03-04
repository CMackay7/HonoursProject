import React from "react";


class BallotList extends React.Component {

  constructor(props){
    super(props);
    this.deleteBallot = this.deleteBallot.bind(this);
    this.state = {candidate: "", votes: ''};
}

    render(){
        return(
            <ul>
            {this.props.ballots.map(item => (
              <li key={item.id} >{item.candidate} = {item.votes}
              <button onClick={() => this.deleteBallot(item.candidate)}>delete</button></li>
            ))}
          </ul>
        )
    }

    deleteBallot(candidatename){
      var place = 0;
      for(var i = 0; i < this.props.ballots; i++){
        if(candidatename === this.props.ballots.candidate){
          place = i;
          break;
        }
      }
      this.props.deleteballot(place);
    }
}

export default BallotList;
  