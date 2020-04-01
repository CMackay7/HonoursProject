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
    background-color: #666666;
    opacity: 0.45;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    border: none;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Plurality</h1>
        <p>A plurality voting system is one in which voters can only vote once and only for one candidate</p>
      </Container>
    </Jumbo>
  </Styles>
)