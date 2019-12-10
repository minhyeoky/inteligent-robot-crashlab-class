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
  height: 120px;
  font-size: xx-large;
  font-weight: bold;
  color: #0a3a5d;
  padding: 0 0;
}
`;

export const ImageWrapper = styled('img')`
`;

