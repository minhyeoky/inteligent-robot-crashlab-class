import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {Table, TableBody, TableCell, TableHead, TableRow,} from "@material-ui/core";


const HistoryWrapper = styled('div')`
  border: 2px solid green;
  padding: 10px;
  margin: 10px;
`;


class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                    amount: 100,
                    status: '기부 완료',
                    date: new Date(2015, 4)
                },
                {
                    amount: 100,
                    status: '기부 중',
                    date: new Date(2015, 5)
                },
                {
                    amount: 100,
                    status: '기부금 전달 완료',
                    date: new Date(2015, 6)
                }
            ]
        };
    }

    render() {
        const {rows} = this.state;
        return (
            <HistoryWrapper>
                <Table>
                    <TableHead>
                        <TableCell>기부 금액</TableCell>
                        <TableCell align={"right"}>현황</TableCell>
                        <TableCell align={"right"}>날짜</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow>
                                    <TableCell>{row.amount}원</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.date.getMonth()}월 {row.date.getDay()}일</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </HistoryWrapper>
        );
    }
}


History.propTypes = {
    rows: PropTypes.array,
};

export default History;
