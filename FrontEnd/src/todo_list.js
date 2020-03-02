import React from 'react';
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
        <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add Candidate
          </button>
        </form>
        <List items={this.props.items} handleDelete={this.handleDelete} />
      </div>
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
  
  class List extends React.Component {
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li key={item.id} onClick={() => this.props.handleDelete(item)}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }

  export default TodoList;
  