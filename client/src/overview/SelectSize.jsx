import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

let SelectSize = (props) => {

  return (
    <Dropdown onSelect={(e) => {
      props.selectSku(e);
      props.selectQty(1);
    }}>
      <Dropdown.Toggle style={{
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid #666',
        color: '#666',
        borderRadius: '0px'
      }} variant='secondary' id='select-size-dropdown'>
        {props.selectedSku ? props.data.results[props.selectedStyle].skus[props.selectedSku].size : 'Select Size'}
        {/* Maybe make this text update to what is selected */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(props.data.results[props.selectedStyle].skus).map((sku, index) => {
          return <Dropdown.Item eventKey={sku}>{props.data.results[props.selectedStyle].skus[sku].size}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SelectSize;