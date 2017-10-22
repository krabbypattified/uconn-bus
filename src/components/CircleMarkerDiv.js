import React from 'react'

export default ({color,label,labelPosition, style}) => (
  <div style={{
    backgroundColor:rgba(color, .25),
    width:'29px',
    height:'29px',
    borderRadius:'100px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    ...style
  }}>
    <div style={{
      backgroundColor:rgba(color),
      width:'13px',
      height:'13px',
      borderRadius:'100px',
      border:'2px solid white',
      boxShadow:'0 1px 1px 0 rgba(0,0,0,.3)'
    }}></div>

    {typeof label === 'string' &&
      <div style={{
        position:'absolute',
        margin:'auto',
        whiteSpace:'nowrap',
        color:'white',
        padding:'0 7px',
        borderRadius:'2px',
        fontSize:'11px',
        background:rgba(color),
        transform: position(labelPosition)
      }}>{label}</div>
    }

    {typeof label === 'object' &&
      <div style={{
        position:'absolute',
        margin:'auto',
      }}>{label}</div>
    }
  </div>
)


// Helpers
function rgba(color, opacity=1) {
  if (!/[0-9A-Fa-f]{6}/.test(color)) throw new Error('Marker color must be a HEX value')
  let hex = color.replace('#','');
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r},${g},${b},${opacity})`
}

function position(p) {
  switch (p) {
    case 'right': return 'translateX(calc(50% + 20px))'
    case 'left': return 'translateX(calc(-50% - 20px))'
    case 'top': return 'translateY(calc(50% + 20px))'
    case 'bottom': return 'translateY(calc(-50% - 20px))'
    default: return ''
  }
}
