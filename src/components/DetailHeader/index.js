import React from 'react'
import SVG from 'components/SVG'
import arrowSVG from 'assets/arrow.svg'
import './DetailHeader.css'


const DetailHeader = ({title, onBack, onNext, onDone, hint, ...other}) => (
  <div className='DetailHeader' {...other}>
    {onBack && <SVG onClick={onBack} className='Arrow Back' path={arrowSVG}/>}
    {onNext && <SVG onClick={onNext} className={`Arrow Forward ${hint?'hint':''}`} path={arrowSVG}/>}
    {onDone && <div className='Done'>Done</div>}
    {title}
  </div>
)


export default DetailHeader
