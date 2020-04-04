import React from 'react';
import styled from 'styled-components'

class SumVote extends React.Component {
    render() {
      return (
        <div>
            <h3>Sum Vote</h3>
            <p>Sum vote is a score voting method for single seat elections. Voters give candidates scores from 1-5.
                The winning canidate is calculated by summing the scores for each candidate, the candidate with the highest score is 
                the winner.
            </p>
        </div>
      );
    }
}


export default SumVote;