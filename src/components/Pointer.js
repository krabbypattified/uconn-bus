import React from 'react'
import PropTypes from 'prop-types'
import {debounce} from './helpers'
import pinImage from 'assets/pointer.png'
import pinStickImage from 'assets/pointerStick.png'
import 'assets/Pointer.css'


export default class extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context
    let {onChange} = this.props
    this.debounceThings = debounce(_=>onChange&&onChange(map), 17)
    map.on('center-changed', this.debounceThings)
  }

  componentWillUnmount() {
    this.context.map.off('center-changed', this.debounceThings)
  }

  render() {
    return this.props.label
    ? <div className='Pin'>
        <div>{this.props.label}</div>
        <img src={pinStickImage} alt=''/>
      </div>
    : <div className='Pin'>
        <img src={pinImage} alt=''/>
      </div>
  }
}
