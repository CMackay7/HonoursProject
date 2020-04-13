import React from 'react';

import './App.css';
import {Link, useHistory} from 'react-router-dom'
import history from './history';
import { saveAs } from 'file-saver';
import NameFile from './name_file';
import styled from 'styled-components'

const StyledDiv = styled.div`
    margin-top: 10px;
    .runButton{
        border-radius: 5px;
        padding: 2px;
        border: 0.5px solid black;
        margin-right: 3%;
    }

`;

class PluralityButton extends React.Component{

    constructor(props) {
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
        this.create_json_string = this.create_json_string.bind(this)
    }

    
    render(){
        return(
            <StyledDiv>

                <button className= "runButton" onClick={() =>  this.create_json_string(true)}> Run Election </button>
                <NameFile save={this.downloadFile}/>
                
                
            </StyledDiv>
        )
    }

    //<button onClick={() => this.downloadFile(false)}> Download File </button/
    //
    create_json_string(tosend){
        if((this.props.ballots === [])||(this.props.candidatetowin ==="") || (this.props.candidates === [])){
            return;
        }
        var jsonString = "{";
        var ballotstring = this.create_plurality_ballot_string(this.props.ballots);
        var canidatejson = this.create_candidates_json(this.props.candidates, this.props.similarities,this.props.edditable)
        var candidatetowinjson = '"candidateToWin":"' + this.props.candidatetowin + '",';
        var edditstring = "";
        if (this.props.edditable === false){
            edditstring = "F";
        } else {
            edditstring = "T";
        }
        var edditingjson = '"edditing":"' + edditstring + '",';

        jsonString = jsonString + edditingjson + candidatetowinjson + canidatejson + ballotstring + "}";
        //console.log(jsonString);
        //console.log(canidatejson);
        var jsonobject = JSON.parse(jsonString);
       // var returned = this.fetchFromApi(jsonobject);
        //let history = useHistory();
        if (tosend){
            history.push({
                pathname: '/results',
                state: {
                  id: Date.now(),
                  json: JSON.stringify(jsonobject),
                  urltouse: 'plurality'
                }});
                window.location.reload()
        } else {
            return jsonString
        }

    }

    downloadFile(name){
        var jsonstring = this.create_json_string(false);
        jsonstring = "plurality|" + jsonstring;
        var FileSaver = require('file-saver');
        var blob = new Blob([jsonstring], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, name);
    }




    async fetchFromApi(jsonobject){
        
        // fetch('http://vps755069.ovh.net/plurality')
        // .then(results => {console.log(results)})       

        // console.log("hello")
        
        console.log(jsonobject)

        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: jsonobject
        }
        
        try{
            let response = await fetch('http://vps755069.ovh.net/plurality', options);
            
            let jsonresponce = await response.json();
            console.log(jsonresponce)
            this.returnedFromApi(jsonresponce)
        } catch (error){
            console.error(error);
        }
        
    }

    returnedFromApi(json){
        console.log(json)
    }

    create_plurality_ballot_string(ballots){
        var ballotstring = '"ballots": {';
        for(var i = 0; i < ballots.length; i++){
            var currBallot = ballots[i];
            var candidateName = currBallot.candidate;
            var votes = currBallot.votes;
            var currstring = "";
            if (i === ballots.length -1){
                currstring = '"' + candidateName + '":"' + votes + '"}';
            } else {
                currstring = '"' + candidateName + '":"' + votes + '",';
            }

            ballotstring = ballotstring + currstring
        }

        return ballotstring
    }

    create_candidates_json(candidates, similarities, edditable){
        var candidatestring = '"candidates":[';

        for(var candidate = 0; candidate < candidates.length; candidate++){
            var currentcandidate = candidates[candidate];
            var currentcandidatestring = candidates[candidate].text;
            // if its not edditable dont need to loop through the edit data just leave similarity blank
            if (edditable === false){

                if (candidate === (candidates.length -1)){
                    candidatestring = candidatestring + '{"name":"' + currentcandidatestring + '", "similarity": {}';
                } else {
                    candidatestring = candidatestring + '{"name":"' + currentcandidatestring + '", "similarity": {}';
                }
                
            } else {
                // if it is edditable 
                candidatestring = candidatestring + '{"name":"' + currentcandidatestring + '", "similarity": {';
                // get the data from of current candidate from the similarity dictionary 
                var currsimilarity = similarities[currentcandidatestring];
                var counter = 0;
                
                var simmkeys = Object.keys(currsimilarity)
                // then loop through that dictionary and get each candidate and their similarity 
                for(var simmcand = 0; simmcand < simmkeys.length; simmcand++){
                    if (counter === (simmkeys.length -1)){
                        // if its the last candidate dont put a comma and finish the curly bracket
                        var candidateon = simmkeys[simmcand]
                        candidatestring = candidatestring + '"' + candidateon + '":"' + currsimilarity[candidateon] + '"}';
                    } else {
                        var candidateon = simmkeys[simmcand]
                        candidatestring = candidatestring + '"' + candidateon + '":"' + currsimilarity[candidateon] + '",';
                    }
                    counter = counter + 1;
                }
                
            }
            if(!(candidate === (candidates.length -1))){
                candidatestring = candidatestring + "},";
            }
        }
        //cose the square bracket
        candidatestring = candidatestring + "}],"
        return candidatestring 
    }
}


export default PluralityButton;