import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';
import RelatedProducts from './components/RelatedProducts';
import OutfitList from './components/OutfitList';

const Comparison = ({ productId, setProductId, productName, productRating, currentStyleData}) => {
  const [products, setProducts] = useState([]);
  const [productImg, setProductImg] = useState(false);
  const [productStyle, setProductStyle] = useState(false);
  const [multiProductMeta, setMultiProductMeta] = useState(null);
  const [multiRating, setMultiRating] = useState(null);

  const getRelatedProductsId = () => {
    const options = {
      method: 'get',
      url: ``,
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(options)
      .then((result) => {
        if (result.data.length !== 0) {
          let arrayOfRelatedProducts = [...new Set(result.data)];
          if (arrayOfRelatedProducts.indexOf(productId) > 0) {
            arrayOfRelatedProducts.splice(arrayOfRelatedProducts.indexOf(productId), 1);
          }
          getRelatedProducts(arrayOfRelatedProducts);
          getRelatedImages(arrayOfRelatedProducts);
          getMultiProductMeta(arrayOfRelatedProducts);
        } else {
          getRelatedProducts([18079, 18080, 18085, 18084]);
          getRelatedImages([18079, 18080, 18085, 18084]);
          getMultiProductMeta([18079, 18080, 18085, 18084]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRelatedProducts = (productIds) => {
    const arr = [];
    productIds.map((product) => {
      arr.push(axios.get(``, { headers: { Authorization: config.TOKEN } }));
    });
    Promise.all(arr)
      .then((results) => {
        setProducts(results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // adding product price since the price and images are from the same endpoint
  const getRelatedImages = (productIds) => {
    const obj = {};
    const objStyle = {};
    const arr = [];
    productIds.map((product) => {
      arr.push(axios.get(``, { headers: { Authorization: config.TOKEN } }));
    });
    Promise.all(arr)
      .then((results) => {
        results.map((item) => {
          if (item.data.results[0].photos[0].thumbnail_url) {
            obj[item.data.product_id] = item.data.results[0].photos[0].thumbnail_url;
          } else {
            obj[item.data.product_id] = '';
          }
          // eslint-disable-next-line prefer-destructuring
          objStyle[item.data.product_id] = item.data.results[0];
        });
        setProductImg(obj);
        setProductStyle(objStyle);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMultiProductMeta = (productIds) => {
    const obj = {};
    const arr = [];
    productIds.map((product) => {
      arr.push(axios.get(``, { headers: { Authorization: config.TOKEN } }));
    });
    Promise.all(arr)
      .then((results) => {
        results.map((metaData) => {
          obj[metaData.data.product_id] = multiRatingCreator(metaData.data.ratings);
        });
        setMultiRating(obj);
      });
  };

  const multiRatingCreator = (ratingsObj) => {
    let allRatings = 0;
    let ratingCount = 0;
    let obj = {};
    const keys = Object.keys(ratingsObj);
    const values = Object.values(ratingsObj);
    for (let i = 0; i < keys.length; i += 1) {
      allRatings += Number(keys[i]) * Number(values[i]);
      ratingCount += Number(values[i]);
    }
    return (allRatings / ratingCount).toFixed(1);
  };

  const changeProduct = (itemId) => {
    setProductId(itemId);
    setProducts([]);
    setProductImg(false);
    setProductStyle(false);
  };

  useEffect(() => {
    getRelatedProductsId();
  }, [productId]);

  return (
    <div>
      <Container>
        {products.length > 0 && productImg && productStyle && multiRating
          ? (
            <RelatedProducts
              products={products}
              images={productImg}
              style={productStyle}
              ratings={multiRating}
              productName={productName}
              productRating={productRating}
              productStyle={currentStyleData}
              setProductId={setProductId}
              setProducts={setProducts}
              setProductImg={setProductImg}
              setProductStyle={setProductStyle}
              changeProduct={changeProduct}
            />
          )
          : null }
        <Divider style={{ marginTop: '20px', marginBottom: '10px' }} />
        <OutfitList
          productId={productId}
          productName={productName}
          productStyle={currentStyleData}
          productRating={productRating}
          changeProduct={changeProduct}
        />
      </Container>
    </div>
  );
};

export default Comparison;