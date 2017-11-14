import React from 'react'
import arrowSVG from 'assets/arrow.svg'


export default ({placeholder, geocode}) => <div className='SearchReceiver'>{geocode||placeholder||null}</div>
