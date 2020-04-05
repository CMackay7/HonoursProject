import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout';

class MinMaxMethod extends React.Component {
    render() {
      return (
        <div>
            <Layout>
            <h3>Ranked Pairs</h3>
            <p>Mean vote is a score voting method for single seat elections. Voters give candidates scores from 1-5.
                There are three steps to calculating the winner in Ranked Pairs 
                1. Tally the vote count comparing each pair of candidates
                2. Sort each pair, by the largest strength of victory first to smallest last 
                3. One by one add a directed edge from the winning candidate to the loosing candidate in a graph
                    if adding the next edge creates a cycle don't add it and find the source of the graph. This candidate
                    is the winner
            </p>
            </Layout>
        </div>
      );
    }
}


export default MinMaxMethod;