import {gql} from 'react-apollo'


export const buses = gql`
query Buses {
  buses {
    id
    latitude
    longitude
    heading
    busLine {
      name
      color
    }
  }
}`


export const busLines = gql`
query BusLines {
  busLines {
    color
  }
}`


export const busStops = gql`
query BusStops {
  busStops {
    id
    latitude
    longitude
    name
  }
}`


export const arrivalsForBus = gql`
query ArrivalsForBus($id: Int!) {
  bus(id: $id) {
    arrivals {
      stop {
        id
        name
      }
      time
    }
  }
}`


export const arrivalsForStop = gql`
query ArrivalsForStop($id: Int!) {
  busStop(id: $id) {
    arrivals {
      bus {
        id
        busLine {
          name
          color
        }
      }
      time
    }
  }
}`
