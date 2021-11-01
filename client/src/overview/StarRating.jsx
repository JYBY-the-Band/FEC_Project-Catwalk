import React from 'react';
import StarRatings from 'react-star-ratings';

// TODO Outline stars somehow
let StarRating = (props) => {
  let average = 0;
  let count = 0;
  for (let key in props.data.ratings) {
    let num = parseInt(key);
    average += num * props.data.ratings[key];
    count += props.data.ratings[key];
  }
  average /= count;
  average = (Math.round(average * 4) / 4).toFixed(2);

  return (
    <div>
      <StarRatings
        rating={parseFloat(average)}
        starRatedColor="DimGrey"
        numberOfStars={5}
        name='rating'
        starDimension='15px'
        starSpacing='1px'
      />
      <a style={{fontSize: 10, margin: 10}}>Read all reviews</a>
    </div>

  )
}

export default StarRating;