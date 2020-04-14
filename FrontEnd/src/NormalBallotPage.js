import React from 'react';
import TodoList from "./todo_list";
import BallotEddit from "./ballot_add";
import BallotList from "./ballot_list";
import EdditSimilarities from "./edditSimilarities";
import CandidateToWin from "./candidate_to_win";
import PluralityButton from "./send_api_buttin";
import { Jumbotron } from './components/Jumbotron_Plurality';
import { Layout } from './components/Layout';
import styled from 'styled-components'
import './App.css';

const NiceButton = styled.button`

    border-radius: 5px;
    border: 0.5px solid black; 
    height: 40px;
    width: 120px;
  `;



class NormalPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {items: [], ballots: [], similarities: {}, candidateToWin:"", edditable: false};
    this.add_candidate = this.add_candidate.bind(this);
    this.delete_candidate = this.delete_candidate.bind(this);
    this.add_ballot = this.add_ballot.bind(this);
    this.populate_similarities = this.populate_similarities.bind(this);
    this.update_similarities = this.update_similarities.bind(this);
    this.delete_candidates_fromsim = this.delete_candidates_fromsim.bind(this);
    this.delete_ballot = this.delete_ballot.bind(this);
    //this.add_ranked_ballot = this.add_ranked_ballot.bind(this);
    this.set_candidate_to_win = this.set_candidate_to_win.bind(this);
  }

  render(){
    return (
      <div>

        <Jumbotron/>
          <Layout>
          <CandidateToWin set_candidate_to_win = {this.set_candidate_to_win} candidates={this.state.items}/>
          <TodoList items={this.state.items} add_candidate = {this.add_candidate} delete_candidate = {this.delete_candidate}/>
          <BallotEddit candidates={this.state.items} add_ballot = {this.add_ballot}/>
          <h3>Ballots</h3>
          <BallotList ballots={this.state.ballots} deleteballot = {this.delete_ballot}/>
          <NiceButton onClick={() => this.populate_similarities()}> add similarities</NiceButton>
          <EdditSimilarities id="edditsim" hidden similarities={this.state.similarities} update_similarities={this.update_similarities}/>
          <PluralityButton ballots={this.state.ballots} candidates={this.state.items} edditable={this.state.edditable} similarities={this.state.similarities}
           candidatetowin={this.state.candidateToWin}/>
          </Layout>
        </div>

     
    );
  }

  //setter for the candidate to win
  set_candidate_to_win(candidate){
    // just stores the local candidate in the state for this component
    this.setState(state => ({
      candidateToWin: candidate,
    }));
  }

  // This function adds a new candidate to the state 
  add_candidate(candidate){
    const newItem = {
      text: candidate,
      id: Date.now()
    };

    // if the user is allowing editing then the canddiate that has been addded needs to be added 
    // to the list of similarities 
    if(Object.keys(this.state.similarities).length > 0){
      this.setState({
        items: this.state.items.concat(newItem)
    }, () => {
        this.populate_similarities();
    });


    } else {
      this.setState(state => ({
        items: state.items.concat(newItem),
      }));
    }
  }

  // This function is used to delete the candidate from the state 
  delete_candidate(place){
    var deletedcandidate = this.state.items[place];
    var ballotplace = this.find_candidate_in_ballot(deletedcandidate.text);
    const newitems = this.state.items;

    // Splicing the array to delete the candidate at the position
    newitems.splice(place, 1);
    this.setState(state => ({
      items: newitems,
    }));

    // if there is a ballot with the deleted candidate in delete the ballot as well
    if(!(ballotplace === -1)){
      this.delete_ballot(ballotplace);
    }

    //Delete the candidate from the list of similarities 
    if (Object.keys(this.state.similarities).length > 0) {
      this.delete_candidates_fromsim(deletedcandidate);
    }
    
  }

  // Used to delete a ballot
  delete_ballot(place){
    // the place that needs to be deleted is passed in so all that needs
    // to happen is a splice and set
    var new_ballots  = this.state.ballots;
    new_ballots.splice(place, 1);

      this.setState(state => ({
        ballots: new_ballots,
      }));  
  }

  add_ballot(item){
    // returns -1 if the candidate hasnt already been added 
    // if the candidate has it returns where the candidate is 
    var place = this.find_candidate_in_ballot(item.candidate);
    
    if (!(place === -1)) {
      //if the candidate is already on the ballot just update the votes
      var old_ballots = this.state.ballots;
      var ballot = old_ballots[place];
      old_ballots.splice(place,1);
      var new_ballots = old_ballots
      var newvotes = Number(ballot.votes) + Number(item.votes);
      const newBallot = {
        candidate: ballot.candidate,
        votes: String(newvotes),
        id: ballot.id
      };
      new_ballots = new_ballots.concat(newBallot);
      this.setState(state => ({
        ballots: new_ballots,
      }));
    } else {

      // if they are not on a ballot add a new one
      this.setState(state => ({
        ballots: state.ballots.concat(item),
      }));
    }
  }



  // Loop through the ballots to find the selected candidate
  find_candidate_in_ballot(candidate){
    var place = -1;
    for (var i = 0; i < this.state.ballots.length; i++){
      var ballot = this.state.ballots[i];
      if (ballot.candidate === candidate){
        
        place = i;
      }
    }
    // return the position of the candidate
    return place;
  }

  // update the similarities of the candidates.
  // it is how similar candfrom is to candto
  update_similarities(candfrom, candto, value){
    var simms = this.state.similarities;
    simms[candfrom][candto] = value;
    this.setState(state => ({
      similarities: simms,
    }));
  }

  // when a candidate is delete they also need to be removed from the similarities 
  delete_candidates_fromsim(candidatein){
    var simms = this.state.similarities;
    var keys = Object.keys(this.state.similarities);
    var candidate = candidatein.text;

    // loop through every candidate and delete the candidate from each 
    for(var i = 0; i < keys.length; i++){

      if(!(keys[i] === candidate)){
        delete simms[keys[i]][candidate];
      }
      
    }

    // then delete the actual candidate from similarities 
    delete simms[candidate];
    this.setState(state => ({
      similarities: simms,
    }));
  }

  // instanciate the simsilariteis
  populate_similarities(){
    var dict_to_add = {};

    //set edditable to true
    if (this.state.edditable === false){
      this.setState(state => ({
        edditable: true,
      }));
    }


    for(var i = 0 ; i < this.state.items.length; i++){
      var currcand = this.state.items[i].text;
      
      var to_add = {};
      for(var x = 0 ; x < this.state.items.length; x++){
        var currcand2 = this.state.items[x].text;
        if (!(currcand === currcand2)){
          to_add[currcand2] = 0;
        }
      }
      dict_to_add[currcand] = to_add;
    }
    this.setState(state => ({
      similarities: dict_to_add,
    }));
  }

} 
export default NormalPage;
