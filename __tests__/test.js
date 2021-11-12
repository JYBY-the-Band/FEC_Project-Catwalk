import React from 'react';
import ReactDOM from 'react-dom';
import {screen, cleanup, fireEvent, render} from '@testing-library/react';
import QaIndex from '../client/src/questions and answers/qaIndex';
import Answer from '../client/src/questions and answers/answer';

describe('Questions and Answers', () => {
  afterEach(() => { cleanup(); });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QaIndex />, div);
  });
  // test('should properly build answers by the seller', () => {
  //   const answer = {
  //     answerer_name: "Seller",
  //     body: "this website, add to cart!",
  //     date: "2021-09-24T00:00:00.000Z",
  //     helpfulness: 15,
  //     id: 3990249,
  //     photos: [],
  //   };
  //   render(<Answer answer={answer} />);
  //   const answerElement = screen.getByTestId(3990249);
  //   expect(answerElement).toBeInTheDocument();
  // });
});

test('checks if 1 equals 1', () => {
  expect(1).toBe(1);
});
