import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout';

class SumVote extends React.Component {
    render() {
      return (
        <div>
            <Layout>
            <h3>Star Vote</h3>
            <p>Sum vote is a score voting method for single seat elections. Voters give candidates scores from 1-5.
                The scores are summed and the twpo highest-rated candidates are selected as finalists. Next there is a 
                isntant-runoff round, the finalist who was given a higher rating on a greater number of ballots is selected as the winner

            </p>
            </Layout>
        </div>
      );
    }
}


export default SumVote;