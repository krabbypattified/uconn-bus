import React from 'react'

import SVG from 'components/dom/SVG'

import arrowSVG from 'assets/arrow.svg'
import 'assets/DetailHeader.css'


export default ({title, onBack, onNext, onDone, hint}) => (
  <div className='DetailHeader'>
    {onBack && <SVG onClick={onBack} className='Arrow Back' path={arrowSVG}/>}
    {onNext && <SVG onClick={onNext} className={`Arrow Forward ${hint?'hint':''}`} path={arrowSVG}/>}
    {onDone && <div className='Done'>Done</div>}
    {title}
  </div>
)
