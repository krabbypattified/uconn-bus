import React from 'react'
import ReactSVG from 'react-svg'
import fuzzy from 'fuzzy'
import xSVG from 'assets/x.svg'
// TODO import correct css


export default class SearchBar extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {fullscreen:false, autofillText:''}
  }

  onKeystroke = e => {
    if (e.keyCode === 27) this.setState({fullscreen:false})
    if (e.keyCode === 13) {
      if (!this.state.fullscreen) return this.setState({fullscreen:true})
      let selection = this.state.autofillText && this.autofiller && this.autofiller[this.autofiller.length-1]
      selection && this.selectBuilding(selection)
    }
  }

  onCancel = e => {
    e.stopPropagation()
    if (this.state.fullscreen) this.setState({fullscreen:false})
  }

  onSelect(building) {
    let {onSelect} = this.props
    onSelect && onSelect(building)
    this.setState({fullscreen:false})
  }

  setAutofill(text) {
    document.querySelector('.Autofill').scrollTo(0,10000)
    this.setState({autofillText:text})
  }

  componentWillMount() {
    document.addEventListener('keyup', this.onKeystroke)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeystroke)
  }

  render() {
    // TODO renamed props, make this a container, progamatically set MAX_HEIGHT on each DOM resize, sort buildings by nearest
    let {data, children} = this.props
    let {fullscreen, autofillText} = this.state


    if (!fullscreen) return <div className='SearchExpander'>{children}</div>


    let buildings = data.buildings.slice(0).reverse()
    if (autofillText) {
      this.autofiller = fuzzy
        .filter(autofillText, buildings, {extract: o => `${o.name} ${o.abbreviation}`})
        .sort((a,b) => a.score - b.score)
        .map(r => r.original)
    }
    else this.autofiller = buildings


    return (
      <div className='SearchExpander Fullscreen'>
        <div className='Autofill'>
          {this.autofiller.map((b, i) => (
            <div key={i} onClick={_=>this.onSelect(b)}>{b.name}<span>{b.abbreviation}</span></div>
          ))}
        </div>
        <div className='SearchBar' onClick={_=>document.querySelector('input.Search').focus()}>
          <input className='Search' placeholder='Search UConn' onChange={e=>this.setAutofill(e.target.value)}/>
        <div className='xSVG' onClick={this.onCancel}><ReactSVG path={xSVG}/></div> {/*TODO xSVG class*/}
        </div>
      </div>
    )
  }
}
