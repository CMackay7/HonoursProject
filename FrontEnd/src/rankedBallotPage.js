import React from 'react';
import logo from './logo.svg';
import MyComp from "./teststuff";
import TodoList from "./todo_list";
import BallotEddit from "./ballot_add";
import BallotList from "./ballot_list";
import EdditSimilarities from "./edditSimilarities";
import BallotEdditRanked from "./ranked_ballot_add";
import BallotEdditScore from "./score_ballot_add";
import RankedBallotList from "./ranked_ballot_list";
import CandidateToWin from "./candidate_to_win";
import RankedButton from "./send_api_button_ranked";
import { JumbotronRanked } from './components/Jumbotron_Ranked';
import { Layout } from './components/Layout';
import './App.css';
import styled from 'styled-components'

const Custombutton = styled.button`


    border-radius: 5px;
    border: 0.5px solid black; 
    height: 40px;
    width: 120px;
`;



class RankedPage extends React.Component{

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
    this.add_ranked_ballot = this.add_ranked_ballot.bind(this);
    this.set_candidate_to_win = this.set_candidate_to_win.bind(this);
    this.ballots_contain_candidate = this.ballots_contain_candidate.bind(this);
  }

  render(){
    return (
      <div>
        <JumbotronRanked/>
        <Layout>
        <CandidateToWin set_candidate_to_win = {this.set_candidate_to_win} candidates={this.state.items} />
          <TodoList items={this.state.items} add_candidate = {this.add_candidate} delete_candidate = {this.delete_candidate}/>
          <BallotEdditRanked candidates={this.state.items} add_ballot = {this.add_ranked_ballot}/>
          <h3>Ballots</h3>
          <RankedBallotList ballots={this.state.ballots} deleteballot = {this.delete_ballot}/>
          <Custombutton onClick={() => this.populate_similarities()}> add similarities</Custombutton>
          <EdditSimilarities id="edditsim" hidden similarities={this.state.similarities} update_similarities={this.update_similarities}/>
          <RankedButton ballots={this.state.ballots} candidates={this.state.items} edditable={this.state.edditable}  candidatetowin={this.state.candidateToWin} similarities={this.state.similarities}/>
          </Layout>
        </div>

     
    );
  }

  //          <BallotEddit candidates={this.state.items} add_ballot = {this.add_ballot}/>

  showDiv() {
    //document.getElementById('welcomeDiv').style.display = "block";
    if(document.getElementById("edditsim").checked === true){
      document.getElementById("edditsim").style.display = "block";
      //alert("remove");
    } else{
      document.getElementById("edditsim").style.display = "none";;
      //alert("add");
    }
    
    
 }

 set_candidate_to_win(candidate){
  this.setState(state => ({
    candidateToWin: candidate,
  }));
}
  add_candidate(candidate){
    

    const newItem = {
      text: candidate,
      id: Date.now()
    };
    var something = this.state.items;

    console.log(this.state.items);
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

  delete_candidate(place){

    var deletedcandidate = this.state.items[place];
    this.ballots_contain_candidate(deletedcandidate)
    var ballotplace = this.find_candidate_in_ballot(deletedcandidate.text);
    const newitems = this.state.items;
    newitems.splice(place, 1);
    this.setState(state => ({
      items: newitems,
    }));

    if(!(ballotplace === -1)){
      this.delete_ballot(ballotplace);
    }

    if (Object.keys(this.state.similarities).length > 0) {
      this.delete_candidates_fromsim(deletedcandidate);
    }
    
  }

  ballots_contain_candidate(candidate_deleted){
    var ballots_to_delete = []
    for(var ballot = 0; ballot < this.state.ballots.length; ballot++){
      var currentBallot = this.state.ballots[ballot]
      var currentCandidates = currentBallot.ballot
      for (var candidate = 0; candidate < currentCandidates.length; candidate++){
        var currentCandidate = currentCandidates[candidate].candidate
        if (currentCandidate === candidate_deleted.text){
          ballots_to_delete = ballots_to_delete.concat(ballot)
          break;
        }
      }

    }

    var new_ballots  = this.state.ballots;
    var delete_count = 0;
    for(var deleteplace = 0; deleteplace < ballots_to_delete.length; deleteplace++){
      new_ballots.splice(ballots_to_delete[deleteplace] - delete_count, 1);
      delete_count = delete_count + 1
    }

    this.setState(state => ({
      ballots: new_ballots,
    }));  
  }

  delete_ballot(place){
    var new_ballots  = this.state.ballots;
    new_ballots.splice(place, 1);

      this.setState(state => ({
        ballots: new_ballots,
      }));  
  }

  add_ballot(item){
    var place = this.find_candidate_in_ballot(item.candidate);
    
    if (!(place === -1)) {
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
      this.setState(state => ({
        ballots: state.ballots.concat(item),
      }));
    }
  }

  add_ranked_ballot(item){
    console.log("herre");
    this.setState(state => ({
      ballots: state.ballots.concat(item),
    }));
    console.log("got added");
  }

  find_candidate_in_ballot(candidate){
    var place = -1;

    for (var i = 0; i < this.state.ballots.length; i++){
      var ballot = this.state.ballots[i];
      if (ballot.candidate === candidate){
        
        place = i;
      }
    }
    return place;
  }

  // find_candidate_name(place){
  //   for (var i = 0; i< this.state.items.length; i++){

  //   }
  // }

  update_similarities(candfrom, candto, value){
    var simms = this.state.similarities;
    simms[candfrom][candto] = value;
    console.log(simms);
    this.setState(state => ({
      similarities: simms,
    }));
  }

  delete_candidates_fromsim(candidatein){
    var simms = this.state.similarities;
    var keys = Object.keys(this.state.similarities);
    var candidate = candidatein.text;

    for(var i = 0; i < keys.length; i++){

      if(!(keys[i] === candidate)){
        delete simms[keys[i]][candidate];
      }
      
    }

    delete simms[candidate];
    console.log(simms);
    this.setState(state => ({
      similarities: simms,
    }));
  }

  populate_similarities(){
    var dict_to_add = {};
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
export default RankedPage;
