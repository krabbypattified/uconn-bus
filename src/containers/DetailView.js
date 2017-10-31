import React from 'react'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import {deselectThing, selectThing} from 'data/actions'
import {arrivalsForBus, arrivalsForStop} from 'data/queries'
import DetailView from 'components/DetailView'


// Redux business
let DetailViewManager = ({thingSelected, thing, deselectThing, selectThing}) => {
  if (!thingSelected) return null
  return <ConnectedContainer isBus={thing.id < 60} onBack={deselectThing} {...({thing,selectThing})}/>
}

export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    thing: state.selectedThingStack[state.selectedThingStack.length-1],
  }),
  dispatch => ({
    selectThing: thing=>dispatch(selectThing(thing)),
    deselectThing: ()=>dispatch(deselectThing()),
  })
)(DetailViewManager)




// GraphQL business
class DetailViewContainer extends React.Component {
  render() {
    let {thing, isBus, onBack, bus, busStop, selectThing} = this.props

    let arrivals=[]
    let loading = isBus ? bus.loading : busStop.loading
    if (!loading) {
      arrivals = isBus ? bus.bus.arrivals : busStop.busStop.arrivals
      // TODO: don't filter? paginate??
      arrivals = arrivals
        .filter(a => a.time < Date.now()+1000*60*100)
        .sort((a,b) => a.time - b.time)
    }
    let type = isBus ? 'BUS' : 'STOP'

    return <DetailView {...({thing,type,arrivals,onBack,loading,selectThing})}/>
  }
}

let ConnectedContainer = compose(

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
