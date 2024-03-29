import * as React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";


export const DivWrapper = styled('div')`
div {
}
`;

export const ButtonWrapper = styled(Button)`
  && {
  // override material ui css rules by '&&'
  width: 720px;
  height: 100px;
  font-size: 50px;
  font-weight: bold;
  color: #0a3a5d;
  padding: 0 0;
  p {
    vertical-align: middle;
  }
}
`;

export const ImageWrapper = styled('img')`
 height: 400px;
 overflow: visible;
`;

