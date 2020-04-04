import React from 'react';
import styled from 'styled-components'

class AlternativeVotePlus extends React.Component {
    render() {
      return (
        <div>
            <h3>Alternative Vote Plus</h3>
            <p>Alternative vote plus is a single winner election method in which voters rank candidates in oder of preference.
                To decide a winner the ballots are first counted based on voters first preference. If a candidate has 50 percent
                of the vote this candidate wins. If not, all but the top two candidates are removed and their votes are given to the remaining 
                candidate they rank highest.
            </p>
        </div>
      );
    }
}


export default AlternativeVotePlus;