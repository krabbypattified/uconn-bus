import React from 'react'
import PropTypes from 'prop-types'
import {debounce} from 'components/helpers'
import pinImage from 'assets/pointer.png'
import pinStickImage from 'assets/pointerStick.png'
import 'assets/Pointer.css'


export default class extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  onChange = () => {
    this.changeFunc()
  }

  componentWillMount() {
    this.context.map.on('center-changed', this.onChange)
  }

  componentWillUnmount() {
    this.context.map.off('center-changed', this.onChange)
  }

  render() {
    let {label, background, onChange} = this.props
    if (onChange) this.changeFunc = debounce(onChange.bind(this, this.context.map), 17)
    return label
    ? <div className='Pin'>
        <div style={{background}}>{label}</div>
        <img src={pinStickImage} alt=''/>
      </div>
    : <div className='Pin'>
        <img src={pinImage} alt=''/>
      </div>
  }
}
