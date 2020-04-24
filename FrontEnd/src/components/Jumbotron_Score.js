import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import pollingCard from '../assets/pollingCard.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${pollingCard}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
    border: none;
  }
  .overlay {
    background-color: #4E4D4D;
    opacity: 0.50;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    border: none;
  }
`;

const Styledtopp = styled.p`
  position: relative;
  bottom: 15px;
 
`;
const Styledh1 = styled.h1`
  position: relative;
  bottom: 20px;
`;

const Styledbottomp = styled.p`
  position: relative;
  bottom: 25px;
  padding-top: 5px;
`;

export const JumbotronScore = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <Styledh1>Score</Styledh1>
        <Styledtopp>A Score voting system is one in which voters assign scores to each candidate.
            E.G. Five Points "A", 3 Points "B"
        </Styledtopp>
        <Styledbottomp>
          To run an election, you need to add candidates, ballots (to describe how voters 
          have voted) and the candidate you want to win. If you want allow the system to add and remove
          candidates you will have to add similarities.  
        </Styledbottomp>
      </Container>
    </Jumbo>
  </Styles>
)