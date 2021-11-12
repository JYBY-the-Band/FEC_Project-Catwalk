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
          {/* TODO: sales */}
          {props.styles.results[props.selectedStyle].sale_price ? <div> <strike>${props.styles.results[props.selectedStyle].original_price}</strike> ${props.styles.results[props.selectedStyle].sale_price}</div> : '$' + props.styles.results[props.selectedStyle].original_price}
          {/* ${props.styles.results[props.selectedStyle].original_price} */}
        </p>
      </Row>
    </div>
  )
}

export default ProductInfo;