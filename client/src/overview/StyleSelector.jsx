import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let Style = (props) => {
  if (!props.selected) {
    return (
      <div>
        <img
          className='d-inline w-75 py-3'
          src={props.data.photos[0].thumbnail_url}
          onClick={() => {
            props.selectStyle(props.index);
          }}
        />
      </div>
    )
  }
  return (
    <div>
      <img
        className='d-inline w-75 py-3'
        src={props.data.photos[0].thumbnail_url}
        onClick={() => {
          props.selectStyle(props.index);
        }}
      />
      <img
        style={
          {
            position: 'absolute',
            transform: 'translate(-50%, 0%)',
            width: '50px',
            height: '50px',
            backgroundColor: 'white',
            borderRadius: '25px',
            border: '2px solid black'
          }
        }
        src='https://www.freeiconspng.com/thumbs/checkmark-png/black-checkmark-png-4.png'
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
                <Style data={item} selectStyle={props.selectStyle} index={index} selected={index === props.selectedStyle} />
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default StyleSelector;