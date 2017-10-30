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
    let {thing, isBus, onBack, data: {loading, bus, busStop}} = this.props

    let arrivals
    if (!loading) arrivals = isBus ? bus.arrivals : busStop.arrivals
    let type = isBus ? 'BUS' : 'STOP'

    return <DetailView {...({thing,type,arrivals,onBack,loading})}/>
  }
}

let ConnectedContainer = compose(

  graphql(arrivalsForBus, {
    skip: ({isBus}) => !isBus,
    options: ({thing}) => ({ variables: { id: thing.id }, notifyOnNetworkStatusChange: true }),
  }),

  graphql(arrivalsForStop, {
    skip: ({isBus}) => isBus,
    options: ({thing}) => ({ variables: { id: thing.id }, notifyOnNetworkStatusChange: true }),
  }),

)(DetailViewContainer)
