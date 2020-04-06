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
import styled from 'styled-components'
import Popup from "reactjs-popup";
import './App.css';

const Custom_button = styled.button`
  border: none;
  color: blue;
  background: white;

  &:hover {
        text-decoration: underline;
        
    }
`;

class documenttodownload extends React.Component{

  constructor(props) {
    super(props);
    // var json = this.props.json
    // alert(json.length)
    this.createList = this.createList.bind(this)
    this.onNumberChange = this.onNumberChange.bind(this)
    var votes_dict =  this.delare_vote_dictionary()
    var url_dict = this.delare_vote_url()
    this.state = {vote_code: votes_dict, url_code: url_dict, filename: ""};
  }

    render() {
        return(
        <Popup trigger={<button>Download File</button>} position="top left">
            {close => (
            <div>
                <input id="candidateVotes" placeholder="Enter the filename" onChange={this.onNumberChange} value={this.state.filename}></input>
                <button onClick={() => this.createList()} disabled={!this.state.filename}>Save</button>

            </div>
            )}
        </Popup>
        )
    }

    onNumberChange(e) {
        this.setState({ filename: e.target.value });
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
    console.log("adsjakfjsd")
    console.log(json)
    var keys = Object.keys(json);
    var jsonlength = Object.keys(json).length;
    console.log(json)
    var documenttodownload = "";
    for(var i = 0; i < jsonlength; i++){
      var curr_system = keys[i];
      var translated_system = this.state.vote_code[curr_system]; 
      var edditdata = json[curr_system]

      var candidates_changed = Object.keys(edditdata)
      if (candidates_changed.length > 0){
        var extra_string = this.convert_edditing(edditdata, candidates_changed)
        documenttodownload = documenttodownload + ("your candidate will win in " + translated_system + " " + extra_string + "\n")

      } else {
        documenttodownload = documenttodownload + ("your selected candidate won in " + translated_system + "\n")  


      }
    }
    var FileSaver = require('file-saver');
    var blob = new Blob([documenttodownload], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, this.state.filename);
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
          stringlengthremoved = stringlengthremoved + 1
        }
      } else {
        if (stringlengthadded === 0){
          addedstring = addedstring + candidates_changed[i];
          stringlengthadded = 1;
        } else {
          addedstring = addedstring + ", " + candidates_changed[i];
          stringlengthadded = stringlengthadded + 1
        }
      }
    }

    if(stringlengthadded > 0){
      if(stringlengthadded > 1){
        returnstring = returnstring + addedstring + " are added to the ballot "
      } else {
        returnstring = returnstring + addedstring + " is added to the ballot "
      }
      

      if(stringlengthremoved > 0){
        returnstring = returnstring + " and "
      }
    }

    if(stringlengthremoved > 0){
      if(stringlengthremoved > 1) {
        returnstring = returnstring + removedstring + " are removed from the ballot."
      } else{
        returnstring = returnstring + removedstring + " is removed from the ballot."
      }
    }
    //console.log(removedstring);
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

  delare_vote_url(){
    var dictionary_to_return = {}
    dictionary_to_return["IRN"] = "instant_run_off";
    dictionary_to_return["AVP"] = "alternative_vote_plus";
    dictionary_to_return["BC"] = 'borda_count';
    dictionary_to_return["CPLN"] = "copeland_method";
    dictionary_to_return["MNX"] = "min_max_method";
    dictionary_to_return["RP"] = "ranked_pairs";
    dictionary_to_return["fptp"] = "first_past_the_post";
    dictionary_to_return["SMV"] = "sum_vote";
    dictionary_to_return["MNV"] = "mean_vote";
    dictionary_to_return["STR"] = "star_vote";

    return dictionary_to_return;
  } 


}


export default documenttodownload;