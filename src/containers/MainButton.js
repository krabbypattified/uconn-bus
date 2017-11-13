import CSSTransitionGroup from 'react-addons-css-transition-group'
import {switchy} from 'components/helpers'
import 'assets/MainButton.css'
import 'assets/MainButtonAnimation.css'

// TODO implement this in SearchBar and delete MainButton files

class MainButton extends React.Component {
  render() {
    return <CSSTransitionGroup
             transitionName={'MainButtonAnimation'}
             transitionAppear={true} transitionAppearTimeout={130} // weird...
             transitionEnterTimeout={130} transitionLeaveTimeout={130}>
               {button}
           </CSSTransitionGroup>
  }
}

// Helpers
let Button = ({children, ...other}) => <ButtonDiv key={1} className='MainButton' {...other}>{children}</ButtonDiv>
let ButtonDiv = styled.div`
  background-color: ${p=>p.color};
  &:active { background-color: ${p=>desaturate(.45,darken(.13,p.color))} }
`
