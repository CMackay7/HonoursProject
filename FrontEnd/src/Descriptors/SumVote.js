import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout'

class SumVote extends React.Component {
    render() {
      return (
        <div>
            <Layout>
            <h3>Sum Vote</h3>
            <p>Sum vote is a score voting method for single seat elections. Voters give candidates scores from 1-5.
                The winning canidate is calculated by summing the scores for each candidate, the candidate with the highest score is 
                the winner.
            </p>
            </Layout>
        </div>
      );
    }
}


export default SumVote;