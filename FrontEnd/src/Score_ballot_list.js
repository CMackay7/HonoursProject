import React from "react";


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
            <ul>
            {display_string.map(item => (
                <li key = {item.place}> {item.displaystring}
                <button onClick={() => this.deleteBallot(item.place)}>delete</button>
                </li>
            ))}
          </ul>
        )
    }

    deleteBallot(id){
        var place = 0
        for(var i = 0; i < this.props.ballots; i++){
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
  