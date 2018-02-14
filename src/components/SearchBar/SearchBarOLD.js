import React from 'react'
import fuzzy from 'fuzzy'

import SVG from 'components/SVG'

import directionsSVG from 'assets/directions.svg'
import searchSVG from 'assets/search.svg'
import xSVG from 'assets/x.svg'
import './SearchBar.css'


export default class SearchBar extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {fullscreen:false, autofill:''}
  }

  onKeystroke(e) {
    if (e.keyCode === 27) this.setState({fullscreen:false})
    if (e.keyCode === 13) {
      if (!this.state.fullscreen) return this.setState({fullscreen:true})
      let selection = this.state.autofill && this.autofiller && this.autofiller[this.autofiller.length-1]
      selection && this.selectBuilding(selection)
    }
  }

  selectBuilding(building) {
    let {onSelect} = this.props
    onSelect && onSelect(building)
    this.setState({fullscreen:false})
  }

  setAutofill(text) {
    let autofill = document.querySelector('.Autofill')
    autofill && autofill.scrollTo(0,10000)
    this.setState({autofill:text})
  }

  componentWillMount() {
    document.addEventListener('keyup', this.onKeystroke.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeystroke)
  }

  componentDidUpdate() {
    let {fullscreen} = this.state
    let input = document.querySelector('input.Search')

    // blur
    if (this.wasFullscreen && !fullscreen) {
      this.setAutofill('')
      if (input) {
        input.blur()
        input.value = ''
      }
    }

    // focus
    else if (!this.wasFullscreen && fullscreen) {
      this.setAutofill('')
      input.focus()
    }
    else if (fullscreen) input.focus()

    this.wasFullscreen = fullscreen
  }

  onButtonClick(e) {
    let {onDirectionsClick} = this.props
    e.stopPropagation()
    if (this.state.fullscreen) this.setState({fullscreen:false})
    else onDirectionsClick&&onDirectionsClick()
  }

  render() {
    let {placeholder, autofill:buildings, loading} = this.props
    let {fullscreen, autofill:autofillText} = this.state
    let Text


    if (loading) Text = <input className='Search' placeholder='Loading...'/>
    else {
      Text = placeholder && !fullscreen
      ? <div className='Search'>
          <div className='Name'>{placeholder.name}</div>
          {placeholder.abbreviation && <span>{placeholder.abbreviation}</span>}
        </div>
      : <input className='Search' placeholder='Search UConn' onChange={e=>this.setAutofill(e.target.value)}/>
    }


    buildings = buildings.slice().reverse()
    if (fullscreen && autofillText) {
      this.autofiller = fuzzy
        .filter(autofillText, buildings, {extract: o => `${o.name} ${o.abbreviation}`})
        .sort((a,b) => a.score - b.score)
        .map(r => r.original)
    }
    else if (fullscreen) this.autofiller = buildings


    let Autofill = fullscreen
    ? <div className='Autofill'>
        {this.autofiller.map((b, i) => <div key={i} onClick={_=>this.selectBuilding(b)}>{b.name}<span>{b.abbreviation}</span></div>)}
      </div>
    : null


    return <div className={`SearchExpander ${fullscreen?'Fullscreen':''}`}>
             {Autofill}
             <div className='SearchBar' onClick={_=>this.setState({fullscreen:true})}>
               {Text}
               {fullscreen ? null : <SVG className='searchSVG' path={searchSVG}/>}
               <SVG className='mainSVG' onClick={e=>this.onButtonClick(e)} path={fullscreen?xSVG:directionsSVG}/>
             </div>
           </div>
  }
}
