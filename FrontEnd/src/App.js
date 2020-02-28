import React from 'react';
import logo from './logo.svg';
import MyComp from "./teststuff";
import TodoList from "./todo_list";
import BallotEddit from "./ballot_add";
import BallotList from "./ballot_list";
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {items: [], ballots: [], similarities: {}};
    this.add_candidate = this.add_candidate.bind(this);
    this.delete_candidate = this.delete_candidate.bind(this);
    this.add_ballot = this.add_ballot.bind(this);
    this.populate_similarities = this.populate_similarities.bind(this);
  }

  render(){
    return (
      <div>
        <h3>hello</h3>
        
          <TodoList items={this.state.items} add_candidate = {this.add_candidate} delete_candidate = {this.delete_candidate}/>
          <BallotEddit candidates={this.state.items} add_ballot = {this.add_ballot}/>
          <h3>Ballots</h3>
          <BallotList ballots={this.state.ballots}/>
          <button onClick={() => this.populate_similarities()}> add similarities</button>
          <input type="checkbox" name="vehicle1" id="hidevalues" onClick={()=> this.showDiv()}></input>
          <div id="welcomeDiv"  hidden class="answer_list" > WELCOME</div>
        </div>

     
    );
  }

  showDiv() {
    //document.getElementById('welcomeDiv').style.display = "block";
    if(document.getElementById("hidevalues").checked === true){
      document.getElementById("welcomeDiv").style.display = "block";
      alert("remove");
    } else{
      document.getElementById("welcomeDiv").style.display = "none";;
      alert("add");
    }
    
    
 }
  add_candidate(candidate){
    

    const newItem = {
      text: candidate,
      id: Date.now()
    };
    var something = this.state.items;
    this.setState(state => ({
      items: state.items.concat(newItem),
    }));
  }

  delete_candidate(place){
    //console.log(place);
    var place = this.find_candidate_in_ballot(this.state.items[place].text);

    const newitems = this.state.items;
    newitems.splice(place, 1);
    this.setState(state => ({
      items: newitems,
    }));

    if(!(place === -1)){
      this.delete_ballot(place);
    }
    
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

  populate_similarities(){
    var dict_to_add = {};
    //console.log(this.state.items);
    for(var i = 0 ; i < this.state.items.length; i++){
      var currcand = this.state.items[i].text;
      console.log(currcand);
      var to_add = {};
      for(var x = 0 ; x < this.state.items.length; x++){
        var currcand2 = this.state.items[x].text;
        if (!(currcand === currcand2)){
          to_add[currcand2] = 0;
          alert(currcand2);
        }
      }
      dict_to_add[currcand] = to_add;
    }
    this.setState(state => ({
      similarities: dict_to_add,
    }));
  }

} 
export default App;
