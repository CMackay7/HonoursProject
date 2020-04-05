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

export const JumbotronRanked = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Ranked</h1>
        <p>A Ranked voting system is one in which voters may vote for multiple candidates, ranking them.
            E.G. First Preference "A", Second Preference "B"
        </p>
      </Container>
    </Jumbo>
  </Styles>
)