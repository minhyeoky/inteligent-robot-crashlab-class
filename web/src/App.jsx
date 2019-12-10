import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import './App.css';
import styled, {createGlobalStyle} from 'styled-components'

import Detail from "./components/detail/detail";
import Intro from "./components/intro";
import QR from "./components/qr";
import Retrieve from "./components/retrieve";
import Guide from "./components/guide";
import Picture from "./components/picture";


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
                <div>
                    <ul>
                        <li>
                            <Link to={'/intro'}>
                                Intro
                            </Link>
                        </li>
                        <li>
                            <Link to={'/qr'}>
                                QR
                            </Link>
                        </li>
                        <li>
                            <Link to={'/guide'}>
                                Guide
                            </Link>
                        </li>
                        <li>
                            <Link to={'/retrieve'}>
                                Retrieve
                            </Link>
                        </li>
                        <li>
                            <Link to={'/loading'}>
                                Loading
                            </Link>
                        </li>

                        <li>
                            <Link to={'/to_detail_qr'}>
                                to_detail_qr
                            </Link>
                        </li>
                        <li>
                            <Link to={'/detail'}>
                                detail
                            </Link>
                        </li>
                        <li>
                            <Link to={'/picture'}>
                                Picture
                            </Link>
                        </li>

                    </ul>
                </div>
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
                    <Route path={'/picture'}>
                        <Picture/>
                    </Route>
                </Switch>
            </Router>
        </AppWrapper>
    );
}

export default App;
