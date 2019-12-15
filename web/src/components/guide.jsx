import * as React from "react";
import {ButtonWrapper, DivWrapper, ImageWrapper} from "./common";
import guideImage_1 from "../assets/guide.png";
import {withRouter} from "react-router-dom";
import {post_status} from "./utils.js";
import {get_status} from "./utils";


/*
* 기부 확인 이후 사진 촬영 안내 등
* */
type
    Props = {};
type
    State = {};

class Guide extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        let current_url = window.location.pathname;
        setInterval(() => {
            if (current_url !== '/intro') {
                post_status(2);
                get_status(this);
            }
        }, 100);
        setTimeout(() => {
            // let current_url = this.props.loca;
            if (current_url === '/guide') {
                this.props.history.push('/intro');
            }
        }, 2000000)
    }

    toIntro() {
        console.log('toIntro');
        this.props.history.push('/intro');
    }

    toYes() {
        // 사진 촬영 페이지로 이동
        this.props.history.push('/picture');
    }

    toNo() {
        // 바로 정보 획득으로 이동
        this.props.history.push('/retrieve');
    }

    render() {
        return (
            <DivWrapper>
                <ImageWrapper src={guideImage_1} alt={'guideImage_1'}/>
                <ButtonWrapper onClick={this.toYes.bind(this)}>예</ButtonWrapper>
                <ButtonWrapper onClick={this.toNo.bind(this)}>아니오</ButtonWrapper>
            </DivWrapper>
        );
    };
}

export default withRouter(Guide);
