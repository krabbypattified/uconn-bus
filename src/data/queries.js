import {gql} from 'react-apollo'

export const buses = gql`{
  buses {
    id
    latitude
    longitude
    heading
    speed
    busLine {
      id
      name
      color
    }
  }
}`

export const busLines = gql`{
  busLines {
    id
    color
  }
}`


export const busStops = gql`{
  busStops {
    id
    latitude
    longitude
    name
  }
}`
