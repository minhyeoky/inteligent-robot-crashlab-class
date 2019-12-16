import * as React from 'react';
import {withRouter} from "react-router-dom";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";
import PictureImage from "../assets/picture.png";
import {loadImage, sleep} from "./utils";


type
    Props = {};
type
    State = {
    photo: any,
    buttonText: string,
    buttonCallback: any
};

class Photo extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            photo: PictureImage,
            buttonText: '촬영하기',
            buttonCallback: this.takePhoto
        }
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
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:5002/photo');
        xhr.onload = () => {
            console.log(xhr.statusText);
            loadImage().then((img) => {
                this.setState({
                    photo: URL.createObjectURL(img),
                    // 'blob' <img> src 사용하기 위해서 url 형태로 저장
                    buttonText: '넘어가기',
                    buttonCallback: this.toIntro
                })
            })
        };
        xhr.onerror = () => {
            console.log(xhr.statusText);
        };
        xhr.send(null);
    };

    toIntro = () => {
        this.props.history.push('/intro');
    };


    render() {
        return (
            <DivWrapper>
                <ImageWrapper src={this.state.photo} alt={'PictureImage'}/>
                <ButtonWrapper onClick={this.state.buttonCallback}>
                    <p>{this.state.buttonText}</p>
                </ButtonWrapper>
            </DivWrapper>
        );
    };
}


export default withRouter(Photo);
