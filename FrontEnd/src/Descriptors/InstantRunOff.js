import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout'

class InstantRunOff extends React.Component {
    render() {
      return (
        <div>
          <Layout>
            <h3>Instant Run Off</h3>
            <p>Instant Run Off is a single seat voting method in which voters rank candidates in order of preference.
                Ballots are first counted depending of voters first preference of candidate. If a candidate has greater than 50 percent of the vote then this candidate wins.
                If not then the candidate with the fewest votes is eliminated and the voters who ranked this candidate first have their votes added to the totals of their second choice.
                This process continues until a winner has been found.
            </p>
            </Layout>
        </div>
      );
    }
}


export default InstantRunOff;