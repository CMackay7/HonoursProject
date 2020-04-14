import React from "react";
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
import SimilarPopup from "./similaritiespopup";
import styled from 'styled-components'


const CustomLi = styled.li`
  width: 300px;
  &:hover {
    text-decoration: underline;
}
`;


 
class EdditSimilarities extends React.Component {

    constructor(props){
        super(props);
        this.createList = this.createList.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    // Render an accordion which contains every similarity between all candidates
    // each entry contains a button which activates a popup to allow the user to change 
    // the similarity
    render(){
        const displayList = this.createList();
        return(
        <div>
            <Accordion atomic={true}>
                {displayList.map(pannel => (
                    pannel
                ))}
            </Accordion>

        </div>
        )
    }

    //Create a list of of pannel objects to display in the accordion
    createList(){
        var outlist = [[]];
        var dict_loop = this.props.similarities;
        
        var setlist = [];
        var candidates = []

        for (var candidatefrom in dict_loop){
            // Each candidate has to have a similarity with every other candidate 
            // so need a nested loop here 
            var next_loop = dict_loop[candidatefrom];
            for (var innercand in next_loop){
                
                var keytoadd = (candidatefrom+"/"+innercand)
                outlist = outlist.concat(<CustomLi key={keytoadd} update_similarities={this.props.update_similarities} id={keytoadd} value="bob" >{candidatefrom} => {innercand}: {next_loop[innercand]} 
                <SimilarPopup handleUpdate={this.handleUpdate} value={keytoadd}/> </CustomLi>);
            }

            candidates = candidates.concat(candidatefrom);
            setlist = setlist.concat(<PannelObjClass key={candidatefrom} candidate={candidatefrom} pannels={outlist}/>);
            outlist = []
        }
        
       
        return setlist;
    }

    //When a similarity is added send this to the main calss
    handleUpdate(canddata, value){
        const candidates = canddata.split('/');
        this.props.update_similarities(candidates[0],candidates[1], Number(value));
    }



   
}

class PannelObjClass extends React.Component {

    render(){
        return(
        <AccordionItem title={this.props.candidate}>
        <ul>
                {this.props.pannels.map(pannel => (
                    pannel
                ))}
        </ul>
    </AccordionItem>);
    }
}

export default EdditSimilarities;