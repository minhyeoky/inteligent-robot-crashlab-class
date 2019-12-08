import * as React from 'react';
import {withRouter} from "react-router-dom";
import {Button} from "@material-ui/core";
import {DivWrapper} from "./common";
import styled from "styled-components";


type
    Props = {};
type
    State = {
    phoneNumber: string;
    secondHypen: string;
};

const ButtonContainer = styled('div')`
  display: grid;
  grid-template-rows: 165px 165px 165px;
  grid-template-columns: 180px 180px 180px 180px;
`;

const ButtonItem = styled(Button)`
&& {
  //border: 1px solid green;
  font-weight: bold;
  font-size: 30px;
  //background-color: ;
}
`;

const PhoneNumberDisplayWrapper = styled('div')`
height: 165px;
text-align: center;
  font-size: 90px;
  font-weight: bold;
  padding: auto;
  margin: auto;
`;


export class Retrieve extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '010',
        }
        ;
    }

    onDone = () => {
        let phoneNumber = this.state.phoneNumber;
        if (phoneNumber.length !== 11) {
            return false;
        }

        // 서버로 전송
        this.props.history.push('/loading');
    };

    onButtonClicked = (num: string) => {
        var tempPhoneNumber = this.state.phoneNumber;
        console.log(tempPhoneNumber);
        if (num === 'del') {
            tempPhoneNumber = tempPhoneNumber.slice(0, -1);
        } else {
            tempPhoneNumber = tempPhoneNumber + num;
        }

        var secondHypen = '';
        let length = tempPhoneNumber.length;
        if (length > 7) {
            secondHypen = '-';
        }
        if (length > 11) {
            return;
        }
        this.setState({
                phoneNumber: tempPhoneNumber,
                secondHypen: secondHypen
            }
        )
    };


    render() {
        let phoneNumber = this.state.phoneNumber;

        return (
            <DivWrapper>
                <PhoneNumberDisplayWrapper>
                <span>
                    {phoneNumber.slice(0, 3)}
                </span>
                    <span>-</span>
                    <span>
                    {phoneNumber.slice(3, 7)}
                </span>
                    <span>{this.state.secondHypen}</span>
                    <span>
                    {phoneNumber.slice(7, 11)}
                </span>

                </PhoneNumberDisplayWrapper>
                <ButtonContainer>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('1')
                    }}>1</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('2')
                    }}>2</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('3')
                    }}>3</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('del')
                    }}>DEL</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('4')
                    }}>4</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('5')
                    }}>5</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('6')
                    }}>6</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('0')
                    }}>0</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('7')
                    }}>7</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('8')
                    }}>8</ButtonItem>
                    <ButtonItem onClick={() => {
                        this.onButtonClicked('9')
                    }}>9</ButtonItem>
                    <ButtonItem onClick={this.onDone}>
                        확인
                    </ButtonItem>
                </ButtonContainer>
            </DivWrapper>
        );
    };
}

export default withRouter(Retrieve);
