import React from 'react';
import RankedPage from "./rankedBallotPage";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {NavigationBar} from './components/NavigationBar';
import NormalPage from './NormalBallotPage';
import ScorePage from './ScoreBallotPage';
import './App.css';
import ResultsPage from './ResultsPage'
import history from './history'
import FromFilePage from './FromFilePage'
import { Layout } from './components/Layout'
import FirstPastThePost from './Descriptors/FirstPastThePost'
import BordaCount from './Descriptors/BordaCount'
import InstantRunOff from './Descriptors/InstantRunOff'
import AlternativeVotePlus from './Descriptors/AlternativeVotePlus'
import CopelandMethod from './Descriptors/CopelandMethod'
import MinMaxMethod from './Descriptors/MinMaxMethod'
import SumVote from './Descriptors/SumVote'
import MeanVote from './Descriptors/MeanVote'
import StarVote from './Descriptors/StarVote'
import RankedPairs from './Descriptors/RankedPairs'

/*
This is the main page of the app, it displays the NagivationBar and runs the router which
handles moving to different componenets when the url changes.
Every page that is addressable will be in this router 
*/
class App extends React.Component{

  render(){
    return (
      <React.Fragment>
      <Router history={history}>
        <div>
          <NavigationBar />
          
          <Switch>
            <Route path="/" exact component ={NormalPage} />
            <Route path="/ranked_vote" component={RankedPage}/>
            <Route path="/score_vote" component={ScorePage}/>
            <Route path="/results" component={ResultsPage}/>
            <Route path="/from_file" component={FromFilePage}/>
            <Route path="/first_past_the_post" component={FirstPastThePost}/>
            <Route path="/borda_count" component={BordaCount}/>
            <Route path="/instant_run_off" component={InstantRunOff}/>
            <Route path="/alternative_vote_plus" component={AlternativeVotePlus}/>
            <Route path="/copeland_method" component={CopelandMethod}/>
            <Route path="/min_max_method" component={MinMaxMethod}/>
            <Route path="/sum_vote" component={SumVote}/>
            <Route path="/mean_vote" component={MeanVote}/>
            <Route path="/star_vote" component={StarVote}/>
            <Route path="/ranked_pairs" component={RankedPairs}/>
          </Switch>
         
        </div>
      </Router>
      </React.Fragment>
    );
  }
}
export default App;