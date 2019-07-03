import React from 'react';

import './bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


function Moneyboard(props) {

  var half = Math.ceil(props.vals.length / 2);
  var vallist = props.vals.slice();
  var leftside = vallist.slice(0, half);
  var rightside = vallist.slice(half, vallist.length);
  var style = {
        pickedStyle: 
            {border: '1px solid black', backgroundColor: 'red'},
        nopickStyle:
            {border: '1px solid black', backgroundColor: 'green'}
  };

  return (
    <Container>
      <Row>
          <Col className = "boardside">
            {leftside.map((item, i) =>
            (
                <div key={i} style={item.picked ? style.pickedStyle : style.nopickStyle}>
                  { item.val }
                </div>  
            ))
            }
            
          </Col>
          <Col className="boardside">
            {rightside.map((item, i) =>
            (
                <div key={i} style={item.picked ? style.pickedStyle : style.nopickStyle}>
                  { item.val }
                </div>  
            ))
            }
          </Col>
      </Row>
    </Container>
  );
}

export default Moneyboard;