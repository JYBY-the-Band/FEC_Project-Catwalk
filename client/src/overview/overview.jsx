import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

let data = {
  id: 1,
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  'default_price': '140'
}

let Overview = (props) => {

  return (
    <Container>
      <Col>
      </Col>
      <Col>
        <ProductInfo data={data} />
      </Col>
    </Container>
  )
}

export default Overview;