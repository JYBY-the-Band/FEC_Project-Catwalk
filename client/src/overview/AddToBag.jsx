import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

let AddToBag = (props) => {

  return (
    <Button className='mt-3' variant='secondary' style={{
      width: '100%',
      borderRadius: '0px',
      border: '1px solid #666',
      backgroundColor: 'white',
      color: '#666'
    }} onClick={(e) => {
      // The api doesnt support sizes?, qty?, i assume all skus are unique i guess?
      axios.post('/api/cart', {sku_id: props.selectedSku});
    }}>
      Add To Bag
    </Button>
  )
}

export default AddToBag;