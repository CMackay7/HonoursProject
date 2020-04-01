import React from 'react';

import Nav from 'react-bootstrap/Nav'; 
import styled from 'styled-components'

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        colour: #6D6968;

        @:hover {
            color: white;
        }
    }
`;


export const NavigationBar = () => ( 
        <Styles>

            <Nav classname="ml-auto">
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