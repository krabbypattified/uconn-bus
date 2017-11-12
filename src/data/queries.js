import gql from 'graphql-tag'


export const geocode = gql`
query Geocode($lngLat: LngLat!) {
  geocode(lngLat: $lngLat) {
    name
    latitude
    longitude
  }
}`

query ArrivalsForBus($id: Int!, $before: Float!) {
  bus(id: $id) {
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
query ArrivalsForBus($id: Int!, $before: Float!) {
  bus(id: $id) {
    arrivals(before: $before) {
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
query ArrivalsForStop($id: Int!, $before: Float!) {
  busStop(id: $id) {
    arrivals(before: $before) {
      time
      bus {
        id
        latitude
        longitude
        busLine {
          name
          color
          path
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
