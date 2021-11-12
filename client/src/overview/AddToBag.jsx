import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

let AddToBag = (props) => {

  return (
    <Button className='mt-3' style={{width: '100%'}} onClick={(e) => {
      // The api doesnt support sizes?, qty?, i assume all skus are unique i guess?
      axios.post('/api/cart', {sku_id: props.selectedSku});
    }}>
      Add To Bag
    </Button>
  )
}

export default AddToBag;