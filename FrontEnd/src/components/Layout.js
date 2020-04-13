import React from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components'

const Customdiv = styled.div`


    padding-bottom: 20px;
`;
export const Layout = (props) => (
    <Customdiv>
    <Container >
        {props.children}
    </Container>
    </Customdiv>
)