import React from 'react';
import styled from 'styled-components'

const Title = styled.h3`
font-size: 1.5em;

`;

const CustomInput = styled.input`
font-size: 1.5em;
border: none;
border-bottom: 2.5px solid black;
padding-left: 10px;
margin-right: 5px;
`;

const Button = styled.button`
    font-family: sans-serif;
    font-size: 1.3rem;
    background: white;
    color: black;
    
    border-radius: 5px;

    &:hover {
      background: #9c9797;
      
        
    }
`;

const InvisableButton = styled.button`
  border: none;
  background: white;
  position: absolute;
`;

const Custdiv = styled.div`
ion-icon{
  margin-top: 7px;

}
`;



//

class TodoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }
  


    render() {
      return (
        <Custdiv>
        <Title>Candidates</Title>
        <form onSubmit={this.handleSubmit}>
          <CustomInput
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="Add Canidates"
          />
          < InvisableButton name="heart">
            <ion-icon  name="add-outline" size="large"></ion-icon>
          </InvisableButton>
        </form>
        <List items={this.props.items} handleDelete={this.handleDelete} />
      </Custdiv>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      
      if (!this.state.text.length) {
        return;
      }
      
      if(this.does_contain(this.state.text)){
        this.setState({text: ''});
        return;
      }
      
      this.setState({text: ''});
      this.props.add_candidate(this.state.text);

    }
  
    does_contain(text) {
      for(var i = 0; i < this.props.items.length ; i++){
        var curr_item = this.props.items[i];
        if(curr_item.text === text){
          return(true);
        }
      }
      return(false);
    }
  
    getIndexOf(item){
      //alert("dcs")
      for(var i = 0; i < this.props.items.length ; i++){
        var curr_item = this.props.items[i];
        console.log(curr_item.text + String(i));
        if(curr_item.text === item){
          return(i)
        }
      }
    }
  
    handleDelete(item) {
        var place = this.getIndexOf(item.text);
        this.props.delete_candidate(place)
        
    }
  }

  const Listdiv = styled.div`
    font-family: sans-serif;
    font-size: 1.3rem;

    color: black;
    border: none;

    font-size: 1.5rem;


    .test {
      width: 300px;
      &:hover {
        text-decoration: underline;
        
    }
    }
`;




  class List extends React.Component {




    render() {
      return (
        <Listdiv>
        <ul >
          {this.props.items.map(item => (
            <li className = "test" key={item.id} onClick={() => this.props.handleDelete(item)}>{item.text}</li>
          ))}
        </ul>
        </Listdiv>
      );
    }
  }

  export default TodoList;
  