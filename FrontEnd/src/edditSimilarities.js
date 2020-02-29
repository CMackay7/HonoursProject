import React from "react";
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

class EdditSimilarities extends React.Component {

    constructor(props){
        super(props);
        this.state = {candidateTo: "", thisCandidate: '', similatity: '', candidate: [], listobj: []};
        this.createList = this.createList.bind(this);
        this.onclickevent = this.onclickevent.bind(this);
    }
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

    littletest(){
        return (<AccordionItem title="title1">
                    <h3>hellothere</h3>
                </AccordionItem>)
    }

    onclickevent(e, id){
        alert(id);
    }

    createList(){
        var outlist = [[]];
        var dict_loop = this.props.similarities;
        
        var setlist = [];
        var candidates = []

        for (var candidatefrom in dict_loop){
            var next_loop = dict_loop[candidatefrom];
            for (var innercand in next_loop){
                
                var keytoadd = (candidatefrom+"/"+innercand)
                ///;
                outlist = outlist.concat(<li key={keytoadd} id={keytoadd} value="bob" >{candidatefrom} => {innercand}: {next_loop[innercand]} 
                <button value = {keytoadd} onClick={e => alert(e.target.value)}>asdasd</button> </li>);
               // console.log(outlist);
            }

            //c
            //console.log(setlist);
            candidates = candidates.concat(candidatefrom);
            setlist = setlist.concat(<PannelObjClass key={candidatefrom} onclickevent={this.onclickevent} candidate={candidatefrom} pannels={outlist}/>);
            outlist = []
        }
        
       
        return setlist;
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