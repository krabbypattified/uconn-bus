import React from 'react'

export default props => (
  <div style={{
    backgroundColor:rgba(props.color, .25),
    width:'29px',
    height:'29px',
    borderRadius:'100px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }}>
    <div style={{
      backgroundColor:rgba(props.color),
      width:'13px',
      height:'13px',
      borderRadius:'100px',
      border:'2px solid white',
      boxShadow:'0 1px 1px 0 rgba(0,0,0,.3)'
    }}></div>
  </div>
)


function rgba(hex, opacity=1) {
  hex = hex.replace('#','');
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r},${g},${b},${opacity})`
}
