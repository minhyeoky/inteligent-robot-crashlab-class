import * as React from 'react';
import {withRouter} from "react-router-dom";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";
import PictureImage from "../assets/picture.png";
import {loadImage, post_status, sleep} from "./utils";
import styled from "styled-components";


type
    Props = {};
type
    State = {
    photo: any,
    buttonText: string,
    buttonCallback: any,
    taking: boolean
};


const PhotoWrapper = styled('div')`
  color: #0a3a5d;
  font-size: 60px;
  text-align: center;
  vertical-align: center;
  p {
    padding: 200px;
    font-weight: bold;
    vertical-align: middle;
  }
`;


class Photo extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            photo: PictureImage,
            buttonText: '촬영 시작',
            buttonCallback: this.takePhoto,
            taking: true
        }
    }

    componentDidMount(): void {
        post_status(6);

        setInterval(() => {
            let buttonText = this.state.buttonText;
            if (this.state.taking === false) {
                return
            }
            if (buttonText.length > 2) {
                buttonText = '9';
            }
            let buttonText1 = (buttonText * 1 - 1).toString();
            if (buttonText1 === '1') {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:5002/take');
                xhr.send();
            }
            if (buttonText1 === '0') {
                loadImage().then((img) => {
                    this.setState({
                        photo: URL.createObjectURL(img),
                        buttonCallback: this.toIntro
                    })
                });
                this.setState({
                    taking: false
                });
            } else {
                this.setState({
                    buttonText: buttonText1
                });
            }
        }, 1000);
    }

    componentWillUnmount(): void {
        clearInterval();
    }

    takePhoto = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:5002/take');
        xhr.onload = () => {
            console.log(xhr.statusText);
        };
        xhr.onerror = () => {
            console.log(xhr.statusText)
        };
        xhr.send();
        this.setState({
            buttonText: '사진 확인하기',
            buttonCallback: this.getPhoto
        })
    };


    getPhoto = () => {
        console.log('getting photo');
        loadImage().then((img) => {
            this.setState({
                photo: URL.createObjectURL(img),
                // 'blob' <img> src 사용하기 위해서 url 형태로 저장
                buttonCallback: this.toIntro
            })
        })
    };

    toIntro = () => {
        this.props.history.push('/intro');
    };

    takeAgain = () => {
        this.setState({
            buttonText: '촬영 시작',
            taking: true
        });
    };
    toRetrieve = () => {
        this.props.history.push('/retrieve');
    };

    render() {
        if (this.state.buttonText * 1 > 5) {
            return (
                <DivWrapper>
                    <PhotoWrapper><p>촬영 준비</p></PhotoWrapper>
                </DivWrapper>
            );
        } else if (this.state.taking === true) {
            return (
                <DivWrapper>
                    <PhotoWrapper><p>{this.state.buttonText}</p></PhotoWrapper>
                </DivWrapper>
            );
        } else {
            return (
                <DivWrapper>
                    <PhotoWrapper><ImageWrapper src={this.state.photo}/></PhotoWrapper>
                    <ButtonWrapper onClick={this.takeAgain}><p>다시 찍고 싶어요!</p></ButtonWrapper>
                    <ButtonWrapper onClick={this.toRetrieve}><p>이걸로 좋아요.</p></ButtonWrapper>
                </DivWrapper>
            )
        }
    };
}


export default withRouter(Photo);
