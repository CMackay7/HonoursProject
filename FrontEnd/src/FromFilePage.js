import React from 'react';
import {Link} from 'react-router-dom'


class FromFilePage extends React.Component{
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
          this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    render() {  
        return(        
            <nav>
                <h3>Logo</h3>
                <input id="input" placeholder="Enter the filename" type="file" onChange={this.onChangeHandler}></input>
            </nav>
        );
    }

    onChangeHandler=event=>{
        //let file = event.target.files[0];
        //console.log(file);
        let data = document.getElementById('input').files[0];
        var filereader = new FileReader();
        filereader.readAsText(data)
        console.log(filereader.result);
        //data.append('file', file)
        console.log(data)

    }
}

export default FromFilePage;