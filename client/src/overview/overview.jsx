import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import StarRating from './StarRating.jsx';
import ImageGallery from './ImageGallery.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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

let productStyles = {
  "product_id": "1",
  "results": [
    {
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default?": true,
      "photos": [
        {
          "thumbnail_url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          "url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
          "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        }
        // ...
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        },
        //...
      }
    },
    {
      "style_id": 2,
      "name": "Desert Brown & Tan",
      "original_price": "140",
      "sale_price": "0",
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "https://www.computerhope.com/jargon/j/jpg.png",
          "url": "https://www.computerhope.com/jargon/j/jpg.png"
        }
        // ...
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        },
        //...
      }
    }
  ]
}

// TODO: find a item with an overview and figure out what to do with it
let Overview = (props) => {


  // TODO: fetch data from api

  return (
    <Container>
      <Row>

        <Col>
          <ImageGallery data={productStyles} />
        </Col>
        <Col xs={3}>
          <StarRating data={reviewMetaData} />
          <ProductInfo data={productData} />
        </Col>
      </Row>
    </Container>
  )
}

export default Overview;