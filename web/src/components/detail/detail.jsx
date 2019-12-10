import React, {Component} from 'react';
import History from "./history";
import Title from "./title";
import Souvenir from "./souvenir";


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Title/>
                <Souvenir/>
                <History/>
            </div>
        );
    }
}


Detail.propTypes = {};

export default Detail;
