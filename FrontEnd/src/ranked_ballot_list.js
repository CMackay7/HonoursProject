import React from "react";


class RankedBallotList extends React.Component {

  constructor(props){
    super(props);
    this.deleteBallot = this.deleteBallot.bind(this);
    this.ballot_to_string = this.ballot_to_string.bind(this);

    this.state = {candidate: "", votes: ''};
}

    render(){
        const display_string = this.ballot_to_string();
        console.log("rsgkjvdfn")
        console.log(display_string)
        return(
            <ul>
            {display_string.map(item => (
                <li key = {item.place}> {item.displaystring}
                <button onClick={() => this.deleteBallot(item.place, display_string)}>delete</button>
                </li>
            ))}
          </ul>
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
                
                returnstring = returnstring+ "  " + (curruse.rank + ": " + curruse.candidate)
                
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

export default RankedBallotList;
  