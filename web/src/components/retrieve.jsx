import * as React from 'react';
import {withRouter} from "react-router-dom";
import {Button} from "@material-ui/core";
import {DivWrapper} from "./common";
import styled from "styled-components";
import {post_status} from "./utils";


type
    Props = {};
type
    State = {
    phoneNumber: string;
    secondHypen: string;
    ok: string;
};

const ButtonContainer = styled('div')`
  display: grid;
  grid-template-rows: 145px 145px 145px;
  grid-template-columns: 180px 180px 180px 180px;
`;

const ButtonItem = styled(Button)`
&& {
  border: 2px solid #0a3a5d;
  //border-radius: 30px;
  font-weight: bold;
  font-size: 40px;
  color: black;
  //background-color: ;
}
`;

const PhoneNumberDisplayWrapper = styled('div')`
  height: 145px;
  text-align: center;
  font-size: 90px;
  font-weight: bold;
  padding: auto;
  margin: auto;
  border: 2px solid #0a3a5d;
  //border-radius: 30px;
  span {
    height: 165px;
    color: black;
    vertical-align: middle;
  }
`;


export class Retrieve extends React.Component<Props, State> {

    constructor(props) {
        // 어떤 목적으로 번호를 얻는 지에 대한 음성안내 메시지가 나올 것
        super(props);
        this.state = {
            phoneNumber: '010',
            ok: '확인'
        }
        ;
    }

    componentDidMount(): void {
        post_status(7);
    }

    componentWillUnmount(): void {
        clearInterval();
    }

    onDone = () => {
        let phoneNumber = this.state.phoneNumber;
        if (phoneNumber.length !== 11) {
            this.setState({
                ok: '재확인'
            });
            return false;
        }

        // 서버로 전송
        let xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:5002/done?phoneNumber=' + {phoneNumber});
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log('[retrieve]');
                console.log(xhr.statusText);
            }
        };
        xhr.onerror = () => {
            console.log('error in posting retrieve');
        }
        xhr.send();

        this.props.history.push('/intro');
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
                        {this.state.ok}
                    </ButtonItem>
                </ButtonContainer>
            </DivWrapper>
        );
    };
}

export default withRouter(Retrieve);
