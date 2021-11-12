import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import SelectSize from './SelectSize.jsx';
import SelectQty from './SelectQty.jsx';
import AddToBag from './AddToBag.jsx';

let Style = (props) => {
  if (!props.selected) {
    return (
      <div>
        <img
          className='d-inline w-100 py-3 border border-dark rounded-circle'
          src={props.data.photos[0].thumbnail_url}
          onClick={() => {
            props.selectStyle(props.index);
            // I wish I could use useEffect but it executes too slow :(
            props.selectQty(null);
            props.selectSku(null);
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

  const [selectedSku, selectSku] = useState(null);
  const [selectedQty, selectQty] = useState(null);

  return (
    <div>
      <span><b>Style ></b> {props.data.results[props.selectedStyle].name}</span>
      <Container>
        {/* TODO: Figure out how to make this wrap at 4 */}
        <Row>
          {props.data.results.map((item, index) => {
            return (
              <Col xs={3}>
                <Style data={item} selectStyle={props.selectStyle} selectSku={selectSku} selectQty={selectQty} index={index} selected={index === props.selectedStyle} />
              </Col>
            )
          })}
        </Row>
        <Row>
          <Col xs={8}>
            <SelectSize selectedStyle={props.selectedStyle} data={props.data} selectedSku={selectedSku} selectSku={selectSku} selectQty={selectQty} />
          </Col>
          <Col xs={4}>
            <SelectQty data={props.data} selectedStyle={props.selectedStyle} selectedSku={selectedSku} selectedQty={selectedQty} selectQty={selectQty} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {selectedQty && <AddToBag selectedSku={selectedSku} />}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StyleSelector;