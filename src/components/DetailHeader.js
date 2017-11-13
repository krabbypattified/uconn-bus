import React from 'react'
import ReactSVG from 'react-svg'
import arrowSVG from 'assets/arrow.svg'
import 'assets/DetailHeader.css'


export default ({title, onBack, onNext, onDone, hint}) => (
  <div className='DetailHeader'>
    {onBack && <div onClick={onBack} className='Arrow Back'><ReactSVG path={arrowSVG}/></div>}
    {onNext && <div onClick={onNext} className={`Arrow Forward ${hint?'hint':''}`}><ReactSVG path={arrowSVG}/></div>}
    {onDone && <div className='Done'>Done</div>}
    {title}
  </div>
)
