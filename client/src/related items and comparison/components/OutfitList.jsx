import React, { useState, useEffect } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
// import styles from './price.module.css';

const OutfitList = ({
  productId, productName, productStyle, productRating, changeProduct
}) => {
  const [outfitList, setOutfitList] = useState([]);
  const [addedOutfit, setAddedOutfit] = useState(false);
  const [removedOutfit, setRemovedOutfit] = useState(false);
  const [index, setIndex] = useState('');
  const [toggleOutfitList, setToggleOutfitList] = useState('');
  const [outfitList2, setOutfitList2] = useState([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);

  const starStyle = {
    display: 'inline',
  };

  function removeOutfit(e) {
    setIndex(e.target.closest('.related-products').getAttribute('data-key'));
    setToggleOutfitList(e.target.closest('.related-products').getAttribute('outfitlist'));
    // if (index === 0, toggleOutfitList === '2') #outfit-carousel(prev)
    setRemovedOutfit(true);
  }

  // set localStorage
  const setLocal = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));
  // localStorage.setItem(key, JSON.stringify(obj));
  // get localStorage
  const getLocal = (key) => JSON.parse(localStorage.getItem(key));
  // JSON.parse(localStorage.getItem(key));
  // remove localStorage
  const removeLocal = (key, i) => {
    const array = getLocal(key);
    array.splice(i, 1);
    localStorage.removeItem(key);
    if (array !== []) {
      setLocal(key, array);
    }
  };

  useEffect(() => {
    setAddButtonClicked(false);
  }, [productStyle, productId]);

  useEffect(() => {
    if (getLocal('outfitList') !== null && getLocal('outfitList').length !== 0 && getLocal('outfitList').length < 4 && outfitList.length === 0) {
      setOutfitList(getLocal('outfitList'));
    }
    if (getLocal('outfitList2') !== null && getLocal('outfitList2').length !== 0 && getLocal('outfitList2').length < 5 && outfitList2.length === 0) {
      setOutfitList2(getLocal('outfitList2'));
    }
    if (addedOutfit && !addButtonClicked) {
      const newList = outfitList;
      if (newList.length < 3) {
        const obj = {
          id: productId,
          name: productName,
          style: productStyle,
          rating: productRating,
        };
        if (JSON.stringify(newList).indexOf(JSON.stringify(obj)) < 0) {
          newList.push(obj);
          setOutfitList(newList);
          setAddedOutfit(false);
          setLocal('outfitList', newList);
          setAddButtonClicked(true);
        }
        setOutfitList(newList);
      } else if (newList.length === 3) {
        const newList2 = outfitList2;
        if (newList2.length < 4) {
          const obj = {
            id: productId,
            name: productName,
            style: productStyle,
            rating: productRating,
          };
          if (JSON.stringify(newList2).indexOf(JSON.stringify(obj)) < 0) {
            newList2.push(obj);
            setOutfitList2(newList2);
            setAddedOutfit(false);
            setLocal('outfitList2', newList2);
            setAddButtonClicked(true);
          }
        } else {
          alert('no more than 7');
        }
      }
    }
    if (removedOutfit) {
      console.log(toggleOutfitList);
      if (toggleOutfitList === '1') {
        const changeList = outfitList;
        changeList.splice(index, 1);
        if (outfitList2.length > 0) {
          const changeList2 = outfitList2;
          const replaceItem = changeList2.splice(0, 1);
          setOutfitList2(changeList2);
          changeList.push(replaceItem[0]);
          removeLocal('outfitList2', 0);
        }
        setOutfitList(changeList);
        removeLocal('outfitList', index);
        setRemovedOutfit(false);
        setAddButtonClicked(false);
      }
      if (toggleOutfitList === '2') {
        const changeList2 = outfitList2;
        changeList2.splice(index, 1);
        setOutfitList2(changeList2);
        removeLocal('outfitList2', index);
        setRemovedOutfit(false);
      }
    }
    if (addedOutfit && addButtonClicked) setAddedOutfit(false);
  }, [addedOutfit, removedOutfit]);

  // onClick={() => tochangeProduct(outfitList[0].id)}

  const toChangeProduct = (e, id) => {
    if (id !== productId && e.target.className === 'outfit-overlay card-img-overlay') {
      changeProduct(id);
    }
  };

  return (
    <div>
      <h5 style={{ marginTop: '20px' }}>Outfit Products</h5>
      <Carousel interval={null} indicators={false} id="outfit-carousel" style={{ marginBottom: '20px' }}>
        <Carousel.Item id="first-list">
          <CardGroup className="outfit-group">
            <Card id="add-card" onClick={() => { setAddedOutfit(true); }} style={{ width: '5rem' }}>
              <Fab id="add-button">
                <h2 id="add-button-text">Add to outfit</h2>
                <AddCircleIcon />
              </Fab>
            </Card>
            {outfitList.length === 0
              ? (
                <>
                  <Card id="first-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                </>
              )
              : outfitList.length === 1
                ? (
                  <>
                    <Card key={outfitList[0].id} outfitlist="1" data-key={0} className="related-products">
                      <Card.Img variant="top" className="related-image" src={outfitList[0].style.photos[0].url} />
                      <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, outfitList[0].id)}>
                        <IconButton onClick={(e) => { removeOutfit(e); }}>
                          <HighlightOffIcon />
                        </IconButton>
                      </Card.ImgOverlay>
                      <Card.Title>{outfitList[0].name}</Card.Title>
                      {
              outfitList[0].style.sale_price !== null ? (
                <Card.Text>
                  <span className={styles.salePrice}>
                    {`${outfitList[0].style.sale_price}`}
                  </span>
                  <span className={styles.originalPrice}>
                    {`${outfitList[0].style.original_price}`}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{outfitList[0].style.original_price}</span>
                </Card.Text>
              )
      }
                      {outfitList[0].rating !== 'NaN' || outfitList[0].rating !== undefined ? (
                        <Stars
                          style={starStyle}
                          rating={outfitList[0].rating}
                        />
                      ) : null}
                    </Card>
                    <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                    <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  </>
                )
                : outfitList.length === 2
                  ? (
                    <>
                      {outfitList.map((item, index) => (
                        <Card key={index} outfitlist="1" data-key={index} className="related-products">
                          <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                          <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, item.id)}>
                            <IconButton onClick={
                              (e) => { removeOutfit(e); }
                            }
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </Card.ImgOverlay>
                          <Card.Title>{[item.name]}</Card.Title>
                          {
              item.style.sale_price !== null ? (
                <Card.Text>
                  <span className={styles.salePrice}>
                    {`${item.style.sale_price}`}
                  </span>
                  <span className={styles.originalPrice}>
                    {`${item.style.original_price}`}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{item.style.original_price}</span>
                </Card.Text>
              )
      }
                          {item.rating !== 'NaN' || item.rating !== undefined ? (
                            <Stars
                              style={starStyle}
                              rating={item.rating}
                            />
                          ) : null}
                        </Card>
                      ))}
                      <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                    </>
                  )
                  : (
                    <>
                      {outfitList.map((item, index) => (
                        <Card key={index} outfitlist="1" data-key={index} className="related-products">
                          <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                          <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, item.id)}>
                            <IconButton onClick={
                              (e) => { removeOutfit(e); }
                            }
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </Card.ImgOverlay>
                          <Card.Title>{[item.name]}</Card.Title>
                          {
              item.style.sale_price !== null ? (
                <Card.Text>
                  <span className={styles.salePrice}>
                    {`${item.style.sale_price}`}
                  </span>
                  <span className={styles.originalPrice}>
                    {`${item.style.original_price}`}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{item.style.original_price}</span>
                </Card.Text>
              )
      }
                          {item.rating !== 'NaN' || item.rating !== undefined ? (
                            <Stars
                              style={starStyle}
                              rating={item.rating}
                            />
                          ) : null}
                        </Card>
                      ))}
                    </>
                  )}
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item id="second-list">
          <CardGroup>
            {outfitList2.length === 0
              ? (
                <>
                  <Card id="first-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="fourth-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                </>
              )

              : outfitList2.length === 1 ? (
                <>
                  <Card key={outfitList2[0].id} outfitlist="2" data-key={0} className="related-products">
                    <Card.Img variant="top" className="related-image" src={outfitList2[0].style.photos[0].url} />
                    <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, outfitList2[0].id)}>
                      <IconButton onClick={(e) => { removeOutfit(e); }}>
                        <HighlightOffIcon />
                      </IconButton>
                    </Card.ImgOverlay>
                    <Card.Title>{outfitList2[0].name}</Card.Title>
                    {
              outfitList[0].style.sale_price !== null ? (
                <Card.Text>
                  <span className={styles.salePrice}>
                    {`${outfitList[0].style.sale_price}`}
                  </span>
                  <span className={styles.originalPrice}>
                    {`${outfitList[0].style.original_price}`}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{outfitList[0].style.original_price}</span>
                </Card.Text>
              )
      }
                    {outfitList2[0].rating !== 'NaN' || outfitList2[0].rating !== undefined ? (
                      <Stars
                        style={starStyle}
                        rating={outfitList2[0].rating}
                      />
                    ) : null}
                  </Card>
                  <Card id="first-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                </>
              ) : outfitList2.length === 2
                ? (
                  <>
                    {outfitList2.map((item, index) => (
                      <Card key={index} outfitlist="2" data-key={index} className="related-products">
                        <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                        <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, item.id)}>
                          <IconButton onClick={
                          (e) => { removeOutfit(e); }
                        }
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </Card.ImgOverlay>
                        <Card.Title>{[item.name]}</Card.Title>
                        {
          item.style.sale_price !== null ? (
            <Card.Text>
              <span className={styles.salePrice}>
                {`${item.style.sale_price}`}
              </span>
              <span className={styles.originalPrice}>
                {`${item.style.original_price}`}
              </span>
            </Card.Text>
          ) : (
            <Card.Text>
              <span>{item.style.original_price}</span>
            </Card.Text>
          )
  }
                        {item.rating !== 'NaN' || item.rating !== undefined ? (
                          <Stars
                            style={starStyle}
                            rating={item.rating}
                          />
                        ) : null}
                      </Card>
                    ))}
                    <Card id="first-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                    <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  </>
                ) : outfitList2.length === 3
                  ? (
                    <>
                      {outfitList2.map((item, index) => (
                        <Card key={index} outfitlist="2" data-key={index} className="related-products">
                          <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                          <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, item.id)}>
                            <IconButton onClick={
                          (e) => { removeOutfit(e); }
                        }
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </Card.ImgOverlay>
                          <Card.Title>{[item.name]}</Card.Title>
                          {
          item.style.sale_price !== null ? (
            <Card.Text>
              <span className={styles.salePrice}>
                {`${item.style.sale_price}`}
              </span>
              <span className={styles.originalPrice}>
                {`${item.style.original_price}`}
              </span>
            </Card.Text>
          ) : (
            <Card.Text>
              <span>{item.style.original_price}</span>
            </Card.Text>
          )
  }
                          {item.rating !== 'NaN' || item.rating !== undefined ? (
                            <Stars
                              style={starStyle}
                              rating={item.rating}
                            />
                          ) : null}
                        </Card>
                      ))}
                      <Card id="first-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                    </>
                  ) : (
                    <>
                      {outfitList2.map((item, index) => (
                        <Card key={index} data-key={index} className="related-products">
                          <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                          <Card.ImgOverlay className="outfit-overlay" onClick={(e) => toChangeProduct(e, item.id)}>
                            <IconButton onClick={
                          (e) => { removeOutfit(e); }
                        }
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </Card.ImgOverlay>
                          <Card.Title>{[item.name]}</Card.Title>
                          {
          item.style.sale_price !== null ? (
            <Card.Text>
              <span className={styles.salePrice}>
                {`${item.style.sale_price}`}
              </span>
              <span className={styles.originalPrice}>
                {`${item.style.original_price}`}
              </span>
            </Card.Text>
          ) : (
            <Card.Text>
              <span>{item.style.original_price}</span>
            </Card.Text>
          )
  }
                          {item.rating !== 'NaN' || item.rating !== undefined ? (
                            <Stars
                              style={starStyle}
                              rating={item.rating}
                            />
                          ) : null}
                        </Card>
                      ))}
                    </>
                  )}
          </CardGroup>
        </Carousel.Item>
      </Carousel>
      <style>
        {`
            .outfit-overlay {
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              padding:0.1rem;
            }
            .outfit-text {
               font-weight: bold;
               font: icon;
               font-size: x-large;
               position: relative;
               bottom: -1px;
             }
             #outfit-carousel .carousel-control-prev {
               width: 2%;
             }
             #outfit-carousel .carousel-control-next {
               width: 2%;
             }
             .add-outfit {
              width: 243.500px;
              height: 271.992px;
              margin: auto;
            }
             .add-outfit-image {
               height: 272px;
               margin: auto;
               padding: 0px;
             }
             .outfit-products {
               height: 270.961px;
               margin: 10px;
               box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
               border-color: grey;
             }
             #add-card {
               height: 267.961px;
               display: flex;
               justify-content: center;
               align-items: center;
               border: 0px;
               margin-top: 10px;
             }
             #add-button-text {
              font-size: large;
              font-family: inherit;
             }
             #add-button {
              height: 267.961px;
              width: 247.5px;
              border-radius: 0px;
             }
             #add-button .MuiFab-label {
              height: 100px;
              width: 100px;
              display: flex;
              flex-flow: column;
             }
             #add-button .MuiFab-label .MuiSvgIcon-root {
              height: 150px;
              width: 150px;
             }
             `}
      </style>
    </div>
  );
};

export default OutfitList;