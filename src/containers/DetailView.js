import React from 'react'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import {deselectThing} from 'data/actions'
import {arrivalsForBus, arrivalsForStop} from 'data/queries'
import DetailView from 'components/DetailView'


// Redux business
let DetailViewManager = ({thingSelected, thing, deselectThing}) => {
  if (!thingSelected) return null
  return <ConnectedContainer thing={thing} isBus={thing.id < 60} onBack={deselectThing}/>
}

export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    thing: state.selectedThingStack[state.selectedThingStack.length-1],
  }),
  dispatch => ({
    deselectThing: ()=>dispatch(deselectThing()),
  })
)(DetailViewManager)




// GraphQL business
class DetailViewContainer extends React.Component {
  render() {
    let {thing, isBus, onBack, bus, busStop} = this.props

    let arrivals=[]
    let loading = isBus ? bus.loading : busStop.loading
    if (!loading) {
      arrivals = isBus ? bus.bus.arrivals : busStop.busStop.arrivals
      arrivals = arrivals
        .filter(a => a.time < Date.now()+1000*60*100)
        .sort((a,b) => a.time - b.time)
    }
    let type = isBus ? 'BUS' : 'STOP'

    return <DetailView {...({thing,type,arrivals,onBack,loading})}/>
  }
}

let ConnectedContainer = compose(

  // TODO: bug should be arrivals for bus not busline, AND they should be unique?!
  graphql(arrivalsForBus, {
    name: 'bus',
    skip: ({isBus}) => !isBus,
    options: ({thing}) => ({ variables: { id: thing.id }, notifyOnNetworkStatusChange: true }),
  }),

  graphql(arrivalsForStop, {
    name: 'busStop',
    skip: ({isBus}) => isBus,
    options: ({thing}) => ({ variables: { id: thing.id }, notifyOnNetworkStatusChange: true }),
  }),

)(DetailViewContainer)
