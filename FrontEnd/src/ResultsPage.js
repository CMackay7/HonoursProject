import React from 'react';
// import logo from './logo.svg';
import RankedPage from "./rankedBallotPage";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav';
import NormalPage from './NormalBallotPage';
import VoteResultsDisplay from './VoteResultsDisplay';
import './App.css';

class ResultsPage extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <h3>
          Made it!
          {this.props.location.state.foo}
        </h3>
        <VoteResultsDisplay json={this.props.json}/>
      </div>
    );
  }

  
}
export default ResultsPage;