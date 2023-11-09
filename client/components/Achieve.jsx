import React from "react";

//CHILD OF ACHIEVEMENTS

function Achieve(props) {
  return (
    
    <div className="shimmer">
      <img className ="achievement-icon" src={props.img} title={props.desc}></img>
      <div className='achievement-element'>{props.achieve}</div>
    </div>
  )
}

export default Achieve;