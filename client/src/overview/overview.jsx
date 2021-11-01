import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import StarRating from './StarRating.jsx';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

let productData = {
  id: 1,
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  'default_price': '140'
}

let reviewMetaData = {
  product_id: 1,
  ratings: {
    1: 1,
    2: 3,
    3: 4,
    4: 7,
    5: 8
  },
  // ...
}

// TODO: find a item with an overview and figure out what to do with it
let Overview = (props) => {

  return (
    <Container>
      <Col>
      </Col>
      <Col>
        <StarRating data={reviewMetaData} />
        <ProductInfo data={productData} />
      </Col>
    </Container>
  )
}

export default Overview;