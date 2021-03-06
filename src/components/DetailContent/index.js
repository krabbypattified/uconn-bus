import React from 'react'
import ReactDOM from 'react-dom'
import Hammer from 'hammerjs'
import {debounce} from 'helpers'
import './DetailContent.css'

// content: [DOM]
// nocontent: String
export default class extends React.Component {

  pop(arg) {
    this.div.style.transition = 'transform .25s'
    this.div.style.transform = translateY(arg ?this.openHeight : this.closeHeight)
    this.noTrans()
    this.popped = arg
    this.currentHeight = arg ? this.openHeight : this.closeHeight
  }

  componentDidMount() {

    let div = ReactDOM.findDOMNode(this)
    this.div = div
    this.noTrans = debounce(_=>this.div.style.transition='',250)


    this.closeHeight = Math.min(div.offsetHeight, 127)
    this.openHeight = div.offsetHeight
    this.currentHeight = this.closeHeight
    this.clamp = {
      min: this.closeHeight,
      max: this.openHeight,
      val: null,
      give: 70
    }


    div.style.transform = translateY(this.currentHeight)
    div.style.paddingBottom = `100px`


    let mc = new Hammer(div)
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 })

    mc.on('pan', e => {
      this.clamp.val = this.currentHeight - e.deltaY
      div.style.transform = translateY(clamp(this.clamp))
    })

    mc.on('panend', _=> {
      let cVal = clamp({...this.clamp, give:0})
      this.popped = this.openHeight-this.clamp.val < this.clamp.val-this.closeHeight
      if (cVal!==this.clamp.val) this.pop(this.popped)
      this.currentHeight = cVal
    })

    mc.on('tap', _=> this.pop(!this.popped))

  }

  render() {
    let {children, noContent, ...other} = this.props
    return <div className='DetailContent' {...other}>{children || <NoContent>{noContent}</NoContent>}</div>
  }

}




let NoContent = ({children}) => (
  <div className='NoContent'>
    <div>{children}</div>
    <div>You may need to <a onClick={()=>window.location.reload()}>refresh the app</a>.</div>
  </div>
)

function translateY(height) {
  return `translateY(calc(100% - ${height}px))`
}

function clamp({min, max, val, give}) {
  if (val > max) return max + Math.min(Math.pow(val - max,.7), give)
  if (val < min) return min - Math.min(Math.pow(min - val,.7), give)
  return val
}
