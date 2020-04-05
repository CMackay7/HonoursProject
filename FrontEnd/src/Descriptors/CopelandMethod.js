import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout'

class CopelandMethod extends React.Component {
    render() {
      return (
        <div>
            <Layout>
            <h3>Copeland Method</h3>
            <p>The Copeland Method is a single member election, in which candidates are ordered by
                the number of pairwise victories minus the number of pairwise defeats.

                To calculate pairwise victories, each candidate is compared with every other candidate in 
                imaginary one-on-one contests the winner is the candidate which is prefered by the greatest number of voters
            </p>
            </Layout>
        </div>
      );
    }
}


export default CopelandMethod;