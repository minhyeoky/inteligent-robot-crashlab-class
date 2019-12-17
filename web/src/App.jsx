import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import './App.css';
import styled, {createGlobalStyle} from 'styled-components'

import Detail from "./components/detail/detail";
import Intro from "./components/intro";
import Intro2 from "./components/intro2";
import QR from "./components/qr";
import Retrieve from "./components/retrieve";
import Guide from "./components/guide";
import Photo from "./components/photo";
import Yes from "./components/yes";


const GloablStyle = createGlobalStyle`
  * {
  padding: 0;
  margin: 0;
  overflow: visible;
  }
  body {
  background-color: white;
  }
`;

const AppWrapper = styled('div')`
  //border: 1px solid black;
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
                    <Route path={'/intro2'}>
                        <Intro2/>
                    </Route>
                    <Route path={'/yes'}>
                        <Yes/>
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
