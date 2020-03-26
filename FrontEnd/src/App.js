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
import ScorePage from './ScoreBallotPage';
import './App.css';
import ResultsPage from './ResultsPage'
import history from './history'
import FromFilePage from './FromFilePage'

class App extends React.Component{

  render(){
    return (
      <div>
      <Router history={history}>
        <div>
          <Nav/>
          <Switch>
            <Route path="/" exact component ={NormalPage} />
            <Route path="/ranked" component={RankedPage}/>
            <Route path="/score" component={ScorePage}/>
            <Route path="/results" component={ResultsPage}/>
            <Route path="/from_file" component={FromFilePage}/>
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;