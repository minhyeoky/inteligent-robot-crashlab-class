import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import './App.css';
import styled, {createGlobalStyle} from 'styled-components'

import Detail from "./components/detail/detail";
import Intro from "./components/intro";
import QR from "./components/qr";
import Retrieve from "./components/retrieve";
import Guide from "./components/guide";
import Photo from "./components/photo";


const GloablStyle = createGlobalStyle`
  * {
  padding: 0;
  margin: 0;
  overflow: auto;
  }
  body {
  background-color: lightgray;
  }
`;

const AppWrapper = styled('div')`
  border: 1px solid red;
  width: 720px;
  margin: auto;
  background-color: white;
`;


function App() {
    return (
        <AppWrapper>
            <GloablStyle/>
            <Router>
                <Switch>
                    <Route path={'/detail'}>
                        <Detail/>
                    </Route>
                    <Route path={'/intro'}>
                        <Intro/>
                    </Route>
                    <Route path={'/qr'}>
                        <QR/>
                    </Route>
                    <Route path={'/retrieve'}>
                        <Retrieve/>
                    </Route>
                    <Route path={'/guide'}>
                        <Guide/>
                    </Route>
                    <Route path={'/photo'}>
                        <Photo/>
                    </Route>
                </Switch>
            </Router>
        </AppWrapper>
    );
}

export default App;
