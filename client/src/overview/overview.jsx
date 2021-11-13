import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import StarRating from './StarRating.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import Description from './Description.jsx';
import List from '../questions and answers/questionsList.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// let productData = {
//   id: 1,
//   name: 'Camo Onesie',
//   slogan: 'Blend in to your crowd',
//   description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//   category: 'Jackets',
//   'default_price': '140'
// }

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

// let productStyles = {
//   "product_id": "1",
//   "results": [
//     {
//       "style_id": 1,
//       "name": "Forest Green & Black",
//       "original_price": "140",
//       "sale_price": "0",
//       "default?": true,
//       "photos": [
//         {
//           "thumbnail_url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
//           "url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
//         },
//         {
//           "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//           "url": "urlplaceholder/style_1_photo_number.jpg"
//         }
//         // ...
//       ],
//       "skus": {
//         "37": {
//           "quantity": 8,
//           "size": "XS"
//         },
//         "38": {
//           "quantity": 16,
//           "size": "S"
//         },
//         "39": {
//           "quantity": 17,
//           "size": "M"
//         },
//         //...
//       }
//     },
//     {
//       "style_id": 2,
//       "name": "Desert Brown & Tan",
//       "original_price": "140",
//       "sale_price": "0",
//       "default?": false,
//       "photos": [
//         {
//           "thumbnail_url": "https://www.computerhope.com/jargon/j/jpg.png",
//           "url": "https://www.computerhope.com/jargon/j/jpg.png"
//         }
//         // ...
//       ],
//       "skus": {
//         "37": {
//           "quantity": 8,
//           "size": "XS"
//         },
//         "38": {
//           "quantity": 16,
//           "size": "S"
//         },
//         "39": {
//           "quantity": 17,
//           "size": "M"
//         },
//         //...
//       }
//     }
//   ]
// }

// TODO: find a item with an overview and figure out what to do with it
let Overview = (props) => {

  const [id, setId] = useState(42366);
  const [selectedStyle, selectStyle] = useState(0);

  const [productData, setProductData] = useState();
  const [productStyles, setProductStyles] = useState();
  // const [reviewMetaData, setReviewMetaData] = useState();

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProductData(res.data);
        return axios.get(`/api/products/${id}/styles`);
      })
      .then(res => {
        setProductStyles(res.data);
        // TODO fetch review data
        // return axios.get(`/api/`)
      })
  }, [id]);

  if (!productStyles || !productData) {
    // TODO make this a spinner maybe
    return (
      // <div>
      //   ...loading
      // </div>
      <Spinner animation='border' size='lg' />
    )
  }
  return (
    <Container>
      <Row>

        <Col xs={6}>
          <Row>
            <ImageGallery data={productStyles} selectedStyle={selectedStyle} />
          </Row>

          <Row>
            <Description data={productData} />
          </Row>
        </Col>
        <Col xs={5}>
          <StarRating data={reviewMetaData} />
          <ProductInfo data={productData} selectedStyle={selectedStyle} styles={productStyles} />
          <StyleSelector data={productStyles} selectedStyle={selectedStyle} selectStyle={selectStyle} />
        </Col>
      </Row>
      <Row><List productId={id} productName={productData.name}/></Row>
      {/* tied the Q&A module here for prop drilling */}
    </Container>
  )
}

export default Overview;