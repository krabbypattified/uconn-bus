import React from 'react'
window.SetExpander = bool => new CustomEvent('SetExpander', {fullscreen: bool})


export default class Expander extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {fullscreen:false}
  }

  onKeystroke = e => {
    if (e.keyCode === 27) this.setState({fullscreen:false}) // ESC
    if (e.keyCode === 13) this.setState({fullscreen:true}) // ENTER
  }

  setExpander = e => {
    this.setState({fullscreen:e.fullscreen})
  }

  componentWillMount() {
    document.addEventListener('keyup', this.onKeystroke)
    document.addEventListener('SetExpander', this.setExpander)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeystroke)
    document.removeEventListener('SetExpander', this.setExpander)
  }

  render() {
    // TODO set maxHeight/Width right before fullscreen and remove it right after !fullscreen
    // OR use web animations api
    let {notFullscreen, fullscreen} = this.props
    if (!this.state.fullscreen) return <div className='Expander'>{notFullscreen}</div>
    return <div className='Expander Fullscreen'>{fullscreen}</div>
  }
}
