import React from 'react'
import {connect} from 'react-redux'
import DetailView, {Title, Detail} from 'components/DetailView'
import {Dot as BusStopDot} from 'components/BusStop'


class DetailViewContainer extends React.Component {
  render() {
    return (
      <DetailView pullForMore>
        <Title>Arjona Eastbound <BusStopDot color='#ff6666'/></Title>
        {[].map(row => <Detail data={row}/>)}
      </DetailView>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    // highlightedThings: state.highlightedThings
  })
)(DetailViewContainer)
