import React from 'react'
import arrowSVG from 'assets/arrow.svg'
import 'assets/DetailHeader.css'

// title: String, DOM
// onBack: Func
// onNext: Func
export default ({title, onBack, onNext}) => (
  <div className='DetailHeader'>
    {onBack && <img className='Arrow Back' onClick={onBack} src={arrowSVG} alt=''/>}
    {onNext && <img className='Arrow Forward' onClick={onNext} src={arrowSVG} alt=''/>}
    {title}
  </div>
)
