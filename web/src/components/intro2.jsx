import * as React from "react";
import {post_status} from "./utils";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";
import introImage from "../assets/intro2.png";
import {withRouter} from "react-router-dom";


type
    Props = {};
type
    State = {};

class Intro2 extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        post_status(2);
    }

    componentWillUnmount(): void {
        clearInterval();
    }

    toNextPage() {
        this.props.history.push('/yes');
    }

    render() {
        return (
            <DivWrapper>
                <ImageWrapper src={introImage} alt={'introImage'}/>
                <ButtonWrapper onClick={this.toNextPage.bind(this)}>
                    <p>좋아요!</p>
                </ButtonWrapper>
            </DivWrapper>
        );
    };
}

export default withRouter(Intro2);
