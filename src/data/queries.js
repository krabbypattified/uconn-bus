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
      path
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
      time
      stop {
        id
        name
        latitude
        longitude
      }
    }
  }
}`


export const arrivalsForStop = gql`
query ArrivalsForStop($id: Int!) {
  busStop(id: $id) {
    arrivals {
      time
      bus {
        id
        latitude
        longitude
        busLine {
          name
          color
        }
      }
    }
  }
}`


export const directions = gql`
query Directions($from: LngLat!, $to: LngLat!) {
  directions(from: $from, to: $to) {

    path

    hopOn {
      time
      bus {
        id
        latitude
        longitude
        heading
        busLine {
          name
          color
        }
      }
      stop {
        id
        latitude
        longitude
        name
      }
    }

    hopOff {
      time
      stop {
        id
        latitude
        longitude
        name
      }
    }
  }
}`
