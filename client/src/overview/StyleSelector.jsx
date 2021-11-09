import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let Style = (props) => {
  if (!props.selected) {
    return (
      <div>
        <img
          className='d-inline w-100 py-3 border border-dark rounded-circle'
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
        className='d-inline w-100 py-3 border border-dark rounded-circle'
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
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '20px',
            border: '1px solid black'
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
      <span><b>Style ></b> {props.data.results[props.selectedStyle].name}</span>
      <Container>
        {/* TODO: Figure out how to make this wrap at 4 */}
        <Row>
          {props.data.results.map((item, index) => {
            return (
              <Col xs={3}>
                <Style data={item} selectStyle={props.selectStyle} index={index} selected={index === props.selectedStyle} />
              </Col>
            )
          })}
        </Row>
        <Row>
          {/* TODO: Size selection qty */}
        </Row>
        <Row>
          {/* TODO: Add to bag, favorite */}
        </Row>
      </Container>
    </div>
  )
}

export default StyleSelector;