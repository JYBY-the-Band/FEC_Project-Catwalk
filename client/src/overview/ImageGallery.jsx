import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

let ImageGalleryItem = (props) => {
  return (
    <Carousel.Item>
      <img src={props.data.photos[0].url} />
    </Carousel.Item>
  );
}

let ImageGallery = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {props.data.results.map(item => {
        return <ImageGalleryItem data={item} />
      })}
    </Carousel>
  )
}

export default ImageGallery;