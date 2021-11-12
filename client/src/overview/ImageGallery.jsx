import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

let ImageGallery = (props) => {
  const [index, setIndex] = useState(props.selectedStyle);

  useEffect(() => {
    setIndex(props.selectedStyle);
  }, [props.selectedStyle]);

  // this is weird, but else it will go 1 too many
  const handleSelect = (selectedIndex, e) => {
    if (selectedIndex > props.data.results.length - 1) {
      setIndex(props.data.results.length - 1);
    } else {
      setIndex(selectedIndex);
    }
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} wrap={false}>
      {props.data.results.map(item => {
        return (
          <Carousel.Item>
            <img
              className='d-block w-100 p-3 mx-auto'
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
                className='d-inline w-50 img-thumbnail'
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