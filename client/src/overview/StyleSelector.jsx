import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let Style = (props) => {
  return (
    <div>
      <img
        className='d-inline w-50'
        src={props.data.photos[0].thumbnail_url}
        onClick={() => {
          props.selectStyle(props.index);
        }}
        />
    </div>
  )
}

let StyleSelector = (props) => {
  return (
    <div>
      <span><b>Style ></b> Selected Style</span>
      <Container>
        {/* TODO: Figure out how to make this wrap at 4 */}
        <Row>
          {props.data.results.map((item, index) => {
            return (
              <Col>
                <Style data={item} selectStyle={props.selectStyle} index={index} />
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default StyleSelector;