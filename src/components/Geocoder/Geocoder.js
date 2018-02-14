import React from 'react'


const Geocoder = ({placeholder, geocode, ...other}) => <div className='Geocoder' {...other}>{(geocode&&geocode.name)||placeholder||null}</div>


export default Geocoder
