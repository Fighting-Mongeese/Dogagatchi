import React from "react";

//CHILD OF ACHIEVEMENTS

function Achieve(props) {
  //console.log('props', props)
  return (
    
    <div className="shimmer">
      <img src={props.img}></img><div className='achievement-element'>{props.achieve}</div>
    </div>
  )
}

export default Achieve;