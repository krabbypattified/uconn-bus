import React from 'react'
import './Expander.css'


// TODO handle max-width/height
const Expander = ({notFullscreen, fullscreen, isFullscreen, className, ...other}) =>
isFullscreen
? <div className={`Expander Fullscreen ${className}`} {...other}>{fullscreen}</div>
: <div className={`Expander NotFullscreen ${className}`} {...other}>{notFullscreen}</div>


export default Expander
