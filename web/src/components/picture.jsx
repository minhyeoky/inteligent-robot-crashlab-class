import * as React from 'react';
import {withRouter} from "react-router-dom";
import {DivWrapper, ImageWrapper} from "./common";
import PictureImage from "../assets/picture.png";


type
Props = {};
type
State = {};

class Picture extends React.Component<Props, State> {
    render() {
        return (
            <DivWrapper>
                <ImageWrapper src={PictureImage} alt={'PictureImage'}/>
            </DivWrapper>
        );
    };
}


export default withRouter(Picture);
