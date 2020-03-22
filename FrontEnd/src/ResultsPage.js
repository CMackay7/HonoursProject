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
    this.fetchFromApi = this.fetchFromApi.bind(this);
    this.returnedFromApi = this.returnedFromApi.bind(this);
    this.state = {datasent: '', votingsystems: '', datarecieved: false};
    this.fetchFromApi(this.props.location.state.json, this.props.location.state.urltouse)
  }

/*
if (this.state.datarecieved) {
      return (
        <div>
          <h3>
            got data mf!
          </h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            Made it!
          </h3>
        </div>
      );
    }
*/

  render(){
    return(
      <div>
        <VoteResultsDisplay json={this.state.votingsystems} />
      </div>
    )

  }

  async fetchFromApi(jsonobject, urlextention){
        
    var url = 'http://vps755069.ovh.net/' + urlextention 

    const options = {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
      body: jsonobject
      }


      try{
        let response = await fetch(url, options);
        
        let jsonresponce = await response.json();
        console.log(response)
        this.returnedFromApi(jsonresponce)
    } catch (error){
        console.error(error);
    }
  }

  returnedFromApi(response){

    var datasentadd = response.datasent;
    
    var votingsystemsadd = delete response.datasent;
    console.log(votingsystemsadd)
    this.setState(state => ({
        datasent: datasentadd,
        votingsystems: response,
        datarecieved: true,
  }));
  
  }

 
}
export default ResultsPage;