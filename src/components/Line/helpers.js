import polyline from '@mapbox/polyline'


export function makeLine({id, coordinates, stroke=4, color='#333'}) {
  if (!Array.isArray(coordinates)) coordinates = polyline.decode(coordinates)
  return {
    "id": id,
    "type": "line",
    "source": {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates
            }
        }
    },
    "layout": {
        "line-join": "round",
        "line-cap": "round"
    },
    "paint": {
        "line-color": color,
        "line-width": stroke
    }
  }
}
