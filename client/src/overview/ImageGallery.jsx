import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

let ImageGallery = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} wrap={false}>
      {props.data.results.map(item => {
        return (
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={item.photos[0].url}
            />
          </Carousel.Item>
        )
      })}
      {/* TODO: style this so it stacks on the side */}
      <ol className='carousel-indicators'>
        {props.data.results.map((item, index) => {
          return (
            <li
              key={index}
              onClick={(e) => handleSelect(index, e)}
            >
              <img
                className='d-inline w-25'
                src={item.photos[0].thumbnail_url}
                 />
            </li>
          )
        })}
      </ol>
    </Carousel>
  )
}

export default ImageGallery;