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
//import Nav from './NavigationBar';
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
    if (displayList.length === 0){
      return(
        <div>
          Your chosen candidate did not win in any voting system
        </div>
      );
    } else {
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
    console.log(json)

    for(var i = 0; i < jsonlength; i++){
      var curr_system = keys[i];
      var translated_system = this.state.vote_code[curr_system]; 
      var edditdata = json[curr_system]
      var candidates_changed = Object.keys(edditdata)
      if (candidates_changed.length > 0){

        returnaccordion = returnaccordion.concat((<AccordionItem title={translated_system}>
          <p>your candidate will win {this.convert_edditing(edditdata, candidates_changed)}</p>
      </AccordionItem>)) ;
      } else {
        returnaccordion = returnaccordion.concat((<AccordionItem title={translated_system}>
          <p> your selected candidate won in {translated_system}  </p>
          </AccordionItem>)) ;
      }


    }
    return returnaccordion;
  }

  convert_edditing(edditdata, candidates_changed){
    var returnstring = "if ";
    var removedstring = "";
    var addedstring = "";
    var stringlengthadded = 0;
    var stringlengthremoved = 0;
    for(var i = 0; i < candidates_changed.length; i++){
      
      if(edditdata[candidates_changed[i]] === "removed"){
        if (stringlengthremoved === 0) {
          removedstring = removedstring + candidates_changed[i]; 
          stringlengthremoved = 1;
        } else {
          removedstring = removedstring + ", " + candidates_changed[i];
        }
      } else {
        if (stringlengthadded === 0){
          addedstring = addedstring + candidates_changed[i];
          stringlengthadded = 1;
        } else {
          addedstring = addedstring + ", " + candidates_changed[i];
        }
      }
    }

    if(stringlengthadded === 1){
      returnstring = returnstring + addedstring + " are added to the ballot"

      if(stringlengthremoved === 0){
        returnstring = returnstring + "and "
      }
    }

    if(stringlengthremoved ===1){
      returnstring = returnstring + removedstring + " are removed from the ballot."
    }
    console.log(removedstring);
    return returnstring;

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