import React from "react";


class BallotList extends React.Component {
    render(){
        return(
            <ul>
            {this.props.ballots.map(item => (
              <li key={item.id} >{item.candidate} = {item.votes}</li>
            ))}
          </ul>
        )
    }
}

export default BallotList;
  