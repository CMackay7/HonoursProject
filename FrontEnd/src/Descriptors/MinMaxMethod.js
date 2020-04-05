import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout'

class MinMaxMethod extends React.Component {
    render() {
      return (
        <div>
            <h3>Min Max Method</h3>
            <p>Min Max Method is a single seat voting method in which voters rank candidates in order of preference.
                The winning candidate is the candidate whose greatest pairwise defeat is smaller then the greatest 
                pairwise defeat for any other candidate. In otherwords the candidate whos worst defeat is better then everyother candidates
                worst defeat.

                To calculate pairwise victories, each candidate is compared with every other candidate in 
                imaginary one-on-one contests. 
            </p>
        </div>
      );
    }
}


export default MinMaxMethod;