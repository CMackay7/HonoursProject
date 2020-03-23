import React from 'react';
// import logo from './logo.svg';
// import MyComp from "./teststuff";
// import TodoList from "./todo_list";
// import BallotEddit from "./ballot_add";
// import BallotList from "./ballot_list";
// import EdditSimilarities from "./edditSimilarities";
// import BallotEdditRanked from "./ranked_ballot_add";
// import BallotEdditScore from "./score_ballot_add";
import RankedPage from "./rankedBallotPage";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav';
import NormalPage from './NormalBallotPage';
import { Accordion, AccordionItem } from 'react-light-accordion';
import ScorePage from './ScoreBallotPage';
import './App.css';

class VoteResultsDisplay extends React.Component{

  constructor(props) {
    super(props);
    // var json = this.props.json
    // alert(json.length)
    this.createList = this.createList.bind(this)
    var votes_dict =  this.delare_vote_dictionary()
    this.state = {vote_code: votes_dict};
  }

  render(){
    const displayList = this.createList();
    return (
      <div>
             <Accordion atomic={true}>
                {displayList.map(pannel => (
                    pannel
                ))}
            </Accordion>
      </div>
    );
  }


  /*
  <Accordion atomic={true}>
                {displayList.map(pannel => (
                    pannel
                ))}
            </Accordion>
  */

  createList(){
    var returnaccordion = []
    var currdict = []
    var json = this.props.json;
    var keys = Object.keys(json);
    var jsonlength = Object.keys(json).length;
    console.log(keys)

    for(var i = 0; i < jsonlength; i++){
      var curr_system = keys[i];
      var translated_system = this.state.vote_code[curr_system]; 
      currdict = (<p>your candidate won in {translated_system}</p>)
      returnaccordion = returnaccordion.concat((<AccordionItem title={translated_system}>
        <p> your selected candidate won in {translated_system}  </p>
    </AccordionItem>)) ;
    }
    return returnaccordion;
  }

  // add every vote type and corresponding code to a dictionary so it can be quickly indexed
  // this component will be called from every voting type so every type needs to be involved 
  delare_vote_dictionary(){
    var dictionary_to_return = {}
    dictionary_to_return["IRN"] = "Instant Run Off";
    dictionary_to_return["AVP"] = "Alternative Vote Plus";
    dictionary_to_return["BC"] = "Borda Count";
    dictionary_to_return["CPLN"] = "Copeland Method";
    dictionary_to_return["MNX"] = "Min Max Method";
    dictionary_to_return["RP"] = "Ranked Pairs";
    dictionary_to_return["fptp"] = "First Past The Post";
    dictionary_to_return["SMV"] = "Sum Vote";
    dictionary_to_return["MNV"] = "Mean Vote";
    dictionary_to_return["STR"] = "Star Vote";

    return dictionary_to_return;
  } 



}
export default VoteResultsDisplay;