import React from 'react';
import './App.css';
import styled, {createGlobalStyle} from 'styled-components'

import Souvenir from "./components/souvenir";
import Title from './components/title'
import History from './components/history'

const GloablStyle = createGlobalStyle`
  * {
  padding: 0px;
  margin: 0px;
  overflow: auto;
  }
  body {
  background-color: lightgray;
  }
`;

const AppWrapper = styled('div')`
  border: 1px solid red;
  width: 50%;
  margin: auto;
  background-color: white;
`;


function App() {
    return (
        <AppWrapper>
            <GloablStyle/>
            <Title/>
            <Souvenir/>
            <History/>
        </AppWrapper>
    );
}

export default App;
