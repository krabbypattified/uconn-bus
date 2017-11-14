/* global SetExpander */
import React from 'react'
import fuzzy from 'fuzzy'

import SVG from 'components/SVG'

import xSVG from 'assets/x.svg'


export default class SearchExpander extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {fullscreen:false, text:''}
  }


  expand() {
    this.setState({fullscreen:true})
    document.querySelector('input.Search').focus()
  }


  contract() {
    this.setText('')
    this.setState({fullscreen:false})
  }


  selectBuilding(building) {
    let {onSelect} = this.props
    this.setText('')
    this.setState({fullscreen:false})
    onSelect && onSelect(building)
  }


  setText(text) {
    document.querySelector('.Autofill').scrollTo(0,10000)
    this.setState({text})
  }


  render() {
    let {data} = this.props
    let {fullscreen, text} = this.state


    let buildings = data.buildings.slice(0).reverse()
    if (fullscreen && text) {
      this.autofiller = fuzzy
        .filter(text, buildings, {extract: o => `${o.name} ${o.abbreviation}`})
        .sort((a,b) => a.score - b.score)
        .map(r => r.original)
    }
    else if (fullscreen) this.autofiller = buildings


    let Autofill = (
      <div className='Autofill'>
        {this.autofiller.map((b, i) => (
          <div key={i} onClick={_=>this.selectBuilding(b)}>{b.name}<span>{b.abbreviation}</span></div> {/*TODO FIX*/}
        ))}
      </div>
    )


    let Search = (
      <div className='SearchBar' onClick={this.expand}>
        <input className='Search' placeholder='Search UConn' onChange={e=>this.setText(e.target.value))}/>
        <SVG className='xSVG' onClick={this.contract} path={xSVG}/> {/*TODO FIX*/}
      </div>
    )


    return (
      <Expander
        fullscreen={} {/*TODO FILL*/}
        notFullscreen={}
      />
    )
  }
}
