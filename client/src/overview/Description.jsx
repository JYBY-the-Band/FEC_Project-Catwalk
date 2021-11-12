import React from 'react'

let Description = (props) => {
  return (
    <div className='m-4'>
      <h3>{props.data.slogan}</h3>
      <p>{props.data.description}</p>
    </div>
  )
}

export default Description;