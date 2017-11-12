import React from 'react'
// import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'
import fuzzy from 'fuzzy'
import directionsSVG from 'assets/directions.svg'
import xSVG from 'assets/x.svg'
import ScrollingName from 'components/ScrollingName'
import 'assets/SearchBar.css'


export default class SearchBar extends React.Component {

  // static contextTypes = {
  //   map: PropTypes.any
  // }

  componentWillMount() {
    this.setState({fullscreen:false, autofill:''})
    this.escape = e => e.keyCode === 27 && this.setState({fullscreen:false})
    document.addEventListener('keyup', this.escape)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escape)
  }

  componentDidUpdate() {
    // Focus/blur input
    if (this.wasFullscreen && !this.state.fullscreen) {
      let input = document.querySelector('input.Search')
      input.blur()
      input.value = ''
    }
    else if (!this.wasFullscreen && this.state.fullscreen) document.querySelector('input.Search').focus()
    this.wasFullscreen = this.state.fullscreen
  }

  onButtonClick(e) {
    let {onDirectionsClick} = this.props
    e.stopPropagation()
    if (this.state.fullscreen) this.setState({fullscreen:false})
    else onDirectionsClick&&onDirectionsClick()
  }

  render() {
    let {placeholder, autofill:buildings, loading, state:directionState} = this.props
    let {fullscreen, autofill} = this.state
    let Text


    if (loading) Text = <input className='Search' placeholder='Loading...'/>
    else {
      Text = placeholder && !fullscreen
      ? <div className='Search'>
          <ScrollingName>{placeholder.name}</ScrollingName>
          {placeholder.abbreviation && <span>{placeholder.abbreviation}</span>}
        </div>
      : <input className='Search' placeholder='Search UConn' onChange={e=>this.setState({autofill:e.target.value})}/>
    }


    let Autofill = fullscreen
    ? <div className='Autofill'>{fuzzy

        .filter(autofill, buildings, {extract: o => `${o.name} ${o.abbreviation}`})
        .sort((a,b) => a.score - b.score)
        .map(({original:b}, i) =>

        <div key={i}>{b.name}<span>{b.abbreviation}</span></div>)}
      </div>
    : null


    return <div className={`SearchExpander ${fullscreen?'Fullscreen':''}`}>
             {Autofill}
             <div className='SearchBar' onClick={_=>this.setState({fullscreen:true})}>
               {Text}
               {directionState || <div onClick={e=>this.onButtonClick(e)}><ReactSVG path={fullscreen?xSVG:directionsSVG}/></div>}
             </div>
           </div>
  }
}
