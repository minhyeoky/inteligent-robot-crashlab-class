import * as React from 'react';
import qr from "../assets/qr.png";
import {withRouter} from "react-router-dom";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";
import {post_status} from "./utils";


type
    Props = {};
type
    State = {};

class QR extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        post_status(4);
        setTimeout(() => {
            this.props.history.push('/intro')
        }, 200000) // TODO 20초
    }

    toNextPage() {
        this.props.history.push('/guide');
    }

    componentWillUnmount(): void {
        clearInterval();
    }

    render() {
        return (
            <DivWrapper>
                <ImageWrapper
                    src={qr}
                    alt={'qr'}/>
                <ButtonWrapper onClick={this.toNextPage.bind(this)}>완료했습니다!</ButtonWrapper>
            </DivWrapper>
        );
    };
}

export default withRouter(QR);
