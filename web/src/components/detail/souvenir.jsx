import React, {Component} from 'react';
import {Button, Card, CardHeader, IconButton, TextField} from '@material-ui/core'
import styled from "styled-components";


const CardWrapper = styled('div')`
  padding: 10px;
  margin: 10px;
  Card {
  border: 10px solid green;
  }
  .expandButton {
  }
  .Email {
    text-align: center;
    float: left;
    margin-top: auto;
    padding: auto;
    margin-left: 10px;
    overflow: hidden;
  }
  
`;


class Souvenir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        };
    }

    handleExpandClick = () => {
        console.log('expandClick');
        this.setState({
            expanded: !this.state.expanded
        });
        console.log(this.state.expanded);
    };

    render() {
        return (
            <CardWrapper>
                <Card>
                    <CardHeader
                        title={'기부 사진'}
                        subheader={'날'}
                    />
                    <div>
                        <img
                            src={'https://user-images.githubusercontent.com/12870549/67160792-4bda9580-f38f-11e9-873b-e57881acea41.png'}
                            alt={'기념 사진'}
                            width={'100%'}
                        />
                    </div>

                    <TextField
                        className={"Email"}
                        required={true}
                        id={"Email"}
                        label={"Email"}
                        margin={"normal"}
                        placeholder={"E-mail"}
                    >
                        이메일주소
                    </TextField>
                    <IconButton
                        className='expandButton'
                        onClick={this.handleExpandClick}
                        edge={'end'}
                    >
                        <Button
                            variant="contained"
                            color={"primary"}
                            fullWidth={true}>
                            이메일 보내기
                        </Button>
                    </IconButton>
                </Card>
            </CardWrapper>
        );
    }
}

Souvenir.propTypes = {};

export default Souvenir;
