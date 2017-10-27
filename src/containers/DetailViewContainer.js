import React from 'react'
import {connect} from 'react-redux'
import {deselectThing} from 'data/actions'
import DetailView, {Title, Detail} from 'components/DetailView'
import BusStopDot from 'components/BusStopDot'
import BusSVG from 'components/BusSVG'


class DetailViewContainer extends React.Component {
  render() {
    let {selectedThingStack} = this.props
    let len = selectedThingStack.length
    if (!len) return null
    let thing = selectedThingStack[len-1]
    let isBus = thing.id < 60

    return isBus
    ? (
      <DetailView pullForMore>
        <Title>{`${thing.busLine.name} Bus`} <BusSVG color={thing.busLine.color}/></Title>
        {[].map(row => <Detail data={row}/>)}
      </DetailView>
    )
    : (
      <DetailView pullForMore>
        <Title>{thing.name} <BusStopDot color='#ff6666'/></Title>
        {[].map(row => <Detail data={row}/>)}
      </DetailView>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    selectedThingStack: state.selectedThingStack,
  }),
  dispatch => ({
    deselectThing: dispatch(deselectThing(null)),
  })
)(DetailViewContainer)
