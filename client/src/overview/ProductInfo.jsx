import React from 'react';
import Row from 'react-bootstrap/Row';

let ProductInfo = (props) => {

  return (
    <div>
      <Row>
        <span>
          {props.data.category}
        </span>
      </Row>
      <Row>
        <h2>
          {props.data.name}
        </h2>
      </Row>
      <Row>
        <p>
          ${props.data.default_price}
        </p>
      </Row>
    </div>
  )
}

export default ProductInfo;