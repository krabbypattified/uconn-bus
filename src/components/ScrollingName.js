import React from 'react'
import ReactDOM from 'react-dom'
import 'web-animations-js'


export default class ScrollingName extends React.Component {
  componentDidMount() {
    let inner = ReactDOM.findDOMNode(this).children[0]

    if (inner.scrollWidth > inner.offsetWidth) {
        animate()
        this.interval = setInterval(animate, 5000)
    }

    function animate() {
      inner.animate(
        [
          {transform:'translateX(0px)'},
          {transform:'translateX(0px)', offset:.25},
          {transform:`translateX(-${inner.scrollWidth-inner.offsetWidth}px)`},
        ],
        {duration:4000, fill:'forwards'}
      )
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }

  render() {
    let {children, onClick} = this.props
    return (
      <div className='Name' onClick={onClick}>
        <div>{children}</div>
      </div>
    )
  }
}
