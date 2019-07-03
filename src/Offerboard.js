import React from 'react';

import './bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function Offerboard(props) {

  const onHandleClick = (i) => {
    props.dealOrNoDeal(i);
  }

  return (
    <Container>
        <Row>
            <Col>
                <p> {props.msgs} </p>
                <button onClick={()=>{onHandleClick(true)}}>Accept</button><button onClick={()=>{onHandleClick(false)}}>Decline</button>
       
            </Col> 
        </Row>
    </Container>
  );
}

export default Offerboard;