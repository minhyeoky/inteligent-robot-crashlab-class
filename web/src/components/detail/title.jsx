import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {Typography} from "@material-ui/core";


const TitleWrapper = styled('div')`
  border: 1px solid red;
  font-weight: bold;
  padding: 10px;
  margin: 10px;
  overflow: hidden;
  h1 {
  overflow: hidden;
  text-align: center;
  }
  h2 {
  overflow: hidden;
  text-align: center;
  color: firebrick;
  font-size: 2em;
  }
`;


class Title extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TitleWrapper>
                <Typography variant={'h3'} component={'h1'} gutterBottom>기부로봇 하냥</Typography>
                <Typography variant={'h4'} component={'h2'} gutterBottom>안녕하세요, {this.props.userName} 님!</Typography>
                <Typography variant={'h4'} component={'h2'} gutterBottom>{this.props.donation}원 기부 해주셨네요!</Typography>
            </TitleWrapper>
        );
    }
}

Title.defaultProps = {
    userName: 'DefaultUserName',
    donation: 0
};

Title.propTypes = {
    userName: PropTypes.string,
    donation: PropTypes.number
};

export default Title;
