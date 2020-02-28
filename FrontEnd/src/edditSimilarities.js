import React from "react";


class EdditSimilarities extends React.Component {

    constructor(props){
        super(props);
        this.state = {candidateTo: "", thisCandidate: '', similatity: ''};
    }
    render(){
        return(
            <ul>
            for(var i = 0; i < 10; i++) {

            }
          </ul>
        )
    }

    createList(){
        var outlist = [];
        var dict_loop = this.state.similarities;

        for (var key in dict_loop){
            var next_loop = dict_loop[key];

            for (var innercand in next_loop){

            }
        }
    }
}

export default EdditSimilarities;