import * as React from 'react';
import qr from "../assets/qr.png";
import {withRouter} from "react-router-dom";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";


type
    Props = {};
type
    State = {};

class QR extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    // componentDidMount(): void {
    //     setTimeout(() => {
    //         this.props.history.push('/guide')
    //     }, 500)
    // }
    toNextPage() {
        this.props.history.push('/guide');
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
