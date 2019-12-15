import introImage from '../assets/intro.png';
import * as React from 'react';
import {withRouter} from "react-router-dom";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";
import {post_status} from "./utils";


type
    Props = {};
type
    State = {};


class Intro extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        setInterval(() => {
            const current_url = window.location.pathname;
            if (current_url === '/intro') {
                post_status(1);
            }
        }, 100)
    }

    toNextPage() {
        this.props.history.push('/qr');
    }

    render() {
        return (
            <DivWrapper>
                <ImageWrapper src={introImage} alt={'introImage'}/>
                <ButtonWrapper onClick={this.toNextPage.bind(this)}>
                    <p>알겠습니다!</p>
                </ButtonWrapper>
            </DivWrapper>
        );
    };
}

export default withRouter(Intro)
