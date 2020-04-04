import React from 'react';
import styled from 'styled-components'

class MinMaxMethod extends React.Component {
    render() {
      return (
        <div>
            <h3>Ranked Pairs</h3>
            <p>Mean vote is a score voting method for single seat elections. Voters give candidates scores from 1-5.
                The winning canidate is calculated by finding the mean score for each candidate, the candidate with the highest mean is 
                the winner.
            </p>
        </div>
      );
    }
}


export default MinMaxMethod;