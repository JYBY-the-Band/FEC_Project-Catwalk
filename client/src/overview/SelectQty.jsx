import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

let SelectQty = (props) => {

  if (props.selectedSku) {
    return (
      <Dropdown onSelect={(e) => {
        props.selectQty(e);
      }}>
        <Dropdown.Toggle style={{
          width: '100%',
          backgroundColor: 'white',
          border: '1px solid #666',
          color: '#666',
          borderRadius: '0px'
        }} variant='secondary' id='select-size-dropdown'>
          {props.selectedQty ? props.selectedQty : 'Qty'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {[...Array(Math.min(props.data.results[props.selectedStyle].skus[props.selectedSku].quantity, 15))].map((num, index) => {
            return <Dropdown.Item eventKey={index + 1}>{index + 1}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  return (
    <Dropdown>
      <Dropdown.Toggle style={{
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid #666',
        color: '#666',
        borderRadius: '0px'
      }} variant='primary' id='select-size-dropdown'>
        -
      </Dropdown.Toggle>
    </Dropdown>
  )

}

export default SelectQty;