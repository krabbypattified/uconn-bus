import { gql } from 'react-apollo'

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
		path
		color
		buses {
			id
		}
	}
}`

export const busStops = gql`{
	busStops {
		id
		latitude
		longitude
		busLines {
			id
			color
		}
		name
		arrivals {
			bus {
				id
				busLine {
					id
					name
					color
				}
			}
			time
		}
	}
}`
