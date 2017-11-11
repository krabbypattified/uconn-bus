import React from 'react'
import ReactSVG from 'react-svg'
import arrowSVG from 'assets/arrow.svg'
import 'assets/DetailHeader.css'

// title: String, DOM
// onBack: Func
// onNext: Func
export default ({title, onBack, onNext}) => (
  <div className='DetailHeader'>
    {onBack && <div className='Arrow Back' onClick={onBack}><ReactSVG path={arrowSVG}/></div>}
    {onNext && <div className='Arrow Forward' onClick={onNext}><ReactSVG path={arrowSVG}/></div>}
    {title}
  </div>
)
