import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout'


class BordaCount extends React.Component {
    render() {
      return (
        <div>
            <Layout>
            <h3>Borda Count</h3>
            <p>Borda Count is a single winner election method in which voters rank candidates in oder of preference.
                In Borda Count the winner is decided be giving a number of points corresponding to the number of candidates 
                ranked lower. Once all votes have been counted the candidate with the most points is the winner
            </p>
            </Layout>
        </div>
      );
    }
}


export default BordaCount;