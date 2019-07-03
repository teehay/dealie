import React from 'react';

import './bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


function Cases(props) {

  var casecpy = props.cases.slice();

  var bottomRow = casecpy.slice(0, 9);
  var middleRow = casecpy.slice(9, 17);
  var topRow = casecpy.slice(17, casecpy.length);

  var rows = [topRow, middleRow, bottomRow];

  const onHandleClick = (i) => {
    props.onCaseSelect(i);
  }

  return (
    <Container>
        {
            rows.map((row, i)=> 
            {
                return (
                    <Row key = {i}>
                    {
                        row.map((item, i) =>
                        {
                            return (
                                <Col key={i} 
                                style=
                                {
                                    item !== props.myCase ?
                                    (item.picked ? {backgroundColor: 'red'} : 
                                    {backgroundColor: 'green', border: '1px solid black'}) : {backgroundColor: 'grey'}
                                } 
                                onClick={() => {onHandleClick(item.index)}}>
                                    { item === props.myCase ? '-' : (item.picked || (props.round === 11 && item !== props.myCase) ? item.val : item.index + 1)}
                                </Col>
                            );  
                        })
                    }
                    </Row>
                );
            })
        }
        <Row>
            <Col key='myCase' xs={{ span: 3, offset: 4 }} 
            style={ 
                     
            props.myCase.index === -1 ? // If no case chosen,
                {backgroundColor: 'grey', marginTop: '5vh'} : // make grey, OTHERWISE
                (props.round >= 10 ? (props.myCase.picked === false ?
                {backgroundColor: 'green', border: '1px solid black', marginTop: '5vh'} : 
                {backgroundColor: 'red', marginTop: '5vh'}) : {backgroundColor: 'green', marginTop: '5vh'}// If it's the last round, make green and pop, OTHERWISE
                )

            }
            onClick={()=>{if (props.round === 10){onHandleClick(props.myCase.index)}}}>
                {props.myCase.picked || props.round === 11 ? props.myCase.val : props.myCase.index + 1}
            </Col>
        </Row>
    </Container>    


    );
}

export default Cases;