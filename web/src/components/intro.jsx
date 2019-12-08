import introImage from '../assets/intro.png';
import * as React from 'react';
import {withRouter} from "react-router-dom";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";


type
    Props = {};
type
    State = {};


class Intro extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    //
    // componentDidMount(): void {
    //     setTimeout(() => {
    //         this.props.history.push('/qr')
    //         // 5000ms 이후 qr 페이지로 이동
    //     }, 100000)
    // }

    toNextPage() {
        this.props.history.push('/qr');
    }

    render() {
        return (
            <DivWrapper>
                <ImageWrapper src={introImage} alt={'introImage'}/>
                <ButtonWrapper onClick={this.toNextPage.bind(this)}>
                    알겠습니다!
                </ButtonWrapper>
            </DivWrapper>
        );
    };
}

export default withRouter(Intro)
