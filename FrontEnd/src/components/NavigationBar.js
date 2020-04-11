import React from 'react';

import { Nav, Navbar } from 'react-bootstrap'; 
import styled from 'styled-components'

const Styles = styled.div`
    .nav {
        background-color: #4E4D4D;
        padding: 10px;
    }



    .nav-link {
        color: white;
        font-weight: bold;
        font-size: large;
    }
`;


export const NavigationBar = () => ( 

        <Styles>

                <Nav justify variant="tabs">
                <Nav.Item><Nav.Link href="/">Plurality</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/ranked_vote">Ranked</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/score_vote">Score</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/from_file">From File</Nav.Link></Nav.Item>
            
            </Nav>

        </Styles>

    )


    /*
                <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">Election App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id = "basic-navbar-nav">
            <Nav justify variant="tabs" defaultActiveKey="/">
                <Nav.item>
                    <Nav.link href="/">Plurality</Nav.link>
                </Nav.item>
                <Nav.item>
                    <Nav.link href="/ranked">Ranked</Nav.link>
                </Nav.item>
                <Nav.item>
                    <Nav.link href="/score">Score</Nav.link>
                </Nav.item>
                <Nav.item>
                    <Nav.link href="/from_file">From File</Nav.link>
                </Nav.item>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Styles>
    */