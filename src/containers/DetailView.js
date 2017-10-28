import React from 'react'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import {deselectThing} from 'data/actions'
import {arrivalsForBus, arrivalsForStop} from 'data/queries'
import DetailView from 'components/DetailView'


// Redux business
let DetailViewManager = ({thingStack, deselectThing}) => {
  let len = thingStack.length

  if (!len) return null

  let thing = thingStack[len-1]
  return <ConnectedContainer thing={thing} isBus={thing.id < 60} onBack={deselectThing}/>
}

export default connect(
  state => ({
    thingStack: state.selectedThingStack,
  }),
  dispatch => ({
    deselectThing: ()=>dispatch(deselectThing()),
  })
)(DetailViewManager)




// GraphQL business
class DetailViewContainer extends React.Component {
  render() {
    let {thing, isBus, data, onBack} = this.props

    let arrivals
    let loading = data.loading
    if (!loading) arrivals = isBus ? data.bus.arrivals : data.busStop.arrivals

    return <DetailView {...({thing,isBus,arrivals,onBack,loading})}/>
  }
}

let ConnectedContainer = compose(

  graphql(arrivalsForBus, {
    skip: ({isBus}) => !isBus,
    options: ({thing}) => ({ variables: { id: thing.id } }),
  }),

  graphql(arrivalsForStop, {
    skip: ({isBus}) => isBus,
    options: ({thing}) => ({ variables: { id: thing.id } }),
  }),

)(DetailViewContainer)
