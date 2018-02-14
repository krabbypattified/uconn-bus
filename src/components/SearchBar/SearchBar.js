import React from 'react'
import PropTypes from 'prop-types'
import fuzzy from 'fuzzy'
import DetailContent from 'components/DetailContent'
import Geocoder from 'components/Geocoder'
import Expander from 'components/Expander'
import SVG from 'components/SVG'
import searchSVG from 'assets/search.svg'
import directionsSVG from 'assets/directions.svg'
import {debounce} from 'helpers'


export default class SearchBar extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  constructor(...args) {
    super(...args)
    this.state = {fullscreen:false, text:'', geocode:null}
  }


  initializeDirections = e => {
    e.stopPropagation()
    this.props.initializeDirections(this.context.map.getCenter().toArray())
  }


  setFullscreen(fullscreen) {
    this.setState({fullscreen})
    if (fullscreen) setTimeout(_=>document.querySelector('.SearchBar input').focus(), 0)
    else this.setText('')
  }


  setText(text) {
    this.setState({text})
    let Autofill = document.querySelector('.Autofill')
    Autofill&&Autofill.scrollTo(0,10000)
  }


  selectBuilding(building) {
    this.setText('')
    this.setState({fullscreen:false, geocode:building})
  }


  get center() {
    let c = this.context.map.getCenter().toArray()
    return {longitude: c[1], latitude: c[0]}
  }


  updateGeocode = () => {
    if (!this.mounted) return
    this.setState({geocode:this.center})
  }


  componentWillMount() {
    this.mounted = true
    this.debounceGeocode = debounce(this.updateGeocode, 350)
    this.context.map.on('center-changed', this.debounceGeocode)
  }


  componentWillUnmount() {
    this.mounted = false
    this.context.map.off('center-changed', this.debounceGeocode)
  }



  render() {
    let {buildings} = this.props
    let {fullscreen, text, geocode} = this.state
    let Autofiller


    // Fuzzy filter buildings
    if (fullscreen && text) Autofiller = fuzzy
        .filter(text, buildings, {extract: o => `${o.name} ${o.abbreviation}`})
        .sort((a,b) => a.score - b.score) // ascending score, best at bottom
        .map(r => r.original)
    else Autofiller = buildings

    // TODO fix the search thingy
    return null

    return (
      <Expander
        className='SearchBar'
        isFullscreen={fullscreen}
        fullscreen={(
          <div>
            <div className='Autofill'>{Autofiller.map((b, i) => <div key={i} onClick={_=>this.selectBuilding(b)}>{b.name}<span>{b.abbreviation}</span></div>)}</div>
            <input placeholder='Search UConn' onChange={e=>this.setText(e.target.value)}/>
          </div>
        )}
        notFullscreen={(
          <DetailContent onClick={_=>this.setFullscreen(true)}>
            <Geocoder placeholder='Search UConn' geocode={geocode||this.center}/>
            <SVG className='searchSVG' path={searchSVG}/>
            <SVG className='directionsSVG' onClick={this.initializeDirections} path={directionsSVG}/>
          </DetailContent>
        )}
      />
    )
  }

}
