import React from "react";

//CHILD OF ACHIEVEMENTS

function Achieve(props) {
  //console.log('props', props)
  return (
    
    <div className="shimmer">
      <img className ="achievement-icon" src={props.img}></img><div className='achievement-element'>{props.achieve}</div>
    </div>
  )
}

export default Achieve;