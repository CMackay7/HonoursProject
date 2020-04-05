import React from 'react';
import history from './history';
import NameFile from './name_file';
import './App.css';

import styled from 'styled-components'

const CustomButton = styled.button`
    margin-top: 10px;
    border-radius: 5px;
    padding: 2px;
    border: 0.5px solid black;
    margin-right: 3%;

`;

class RankedButton extends React.Component{

    constructor(props) {
        super(props);
        this.create_json_string = this.create_json_string.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
    }
    
    render(){
        return(
            <div>
                <CustomButton onClick={() =>  this.create_json_string(true)}> Run Election </CustomButton>
                <NameFile save={this.downloadFile}/>
            </div>
        )
    }
    create_json_string(tosend){
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
        console.log(jsonString);
        var jsonobject = JSON.parse(jsonString);
        //var returned = this.fetchFromApi(jsonobject);

        if (tosend){
            history.push({
                pathname: '/results',
                state: {
                  id: Date.now(),
                  json: JSON.stringify(jsonobject),
                  urltouse: 'ranked'
                }});
                window.location.reload()
        } else {
            return jsonString
        }
    }

    downloadFile(name){
        var jsonstring = this.create_json_string(false);
        jsonstring = "ranked|" + jsonstring;
        var FileSaver = require('file-saver');
        var blob = new Blob([jsonstring], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, name);
    }


    async fetchFromApi(jsonobject){
        
        // fetch('http://vps755069.ovh.net/plurality')
        // .then(results => {console.log(results)})       

        // console.log("hello")
        
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonobject)
        }
        
        try{
            let response = await fetch('http://vps755069.ovh.net/ranked', options);
            
            let jsonresponce = await response.json();
            console.log(response)
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
            var currentbreakdown = currBallot.ballot;
            var votes = currBallot.votes;
            var currstring = "";
            var addstring = '"';
            for(var x = 0; x < currentbreakdown.length; x++){

                var currcand = currentbreakdown[x]
                
                if(x === (currBallot.ballot.length) -1){
                    addstring = addstring + currcand.candidate + '": ';
                } else {
                    addstring = addstring + currcand.candidate + '//';
                }             
            }
            if (i === (ballots.length - 1)){
                addstring = addstring + '"' + votes + '"}'
            }else{
                addstring = addstring + '"' + votes + '",'
            }
            
            ballotstring = ballotstring + addstring
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


export default RankedButton;