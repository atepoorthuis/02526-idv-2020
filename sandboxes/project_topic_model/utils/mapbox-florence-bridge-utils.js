function mercatorXfromLng(lng) {
  return (180 + lng) / 360;
}

function mercatorYfromLat(lat) {
  return (180 - (180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)))) / 360;
}

export function projectMapboxMercator(coords) {
  const x = mercatorXfromLng(coords[0])
  const y = mercatorYfromLat(coords[1])
  return [x, y]
}

export function projectBbox (bounds) {
  const bbox = {}
  bbox.x = [bounds._sw.lng, bounds._ne.lng]
  bbox.y = [bounds._ne.lat, bounds._sw.lat]
  bbox.x = bbox.x.map(coord => mercatorXfromLng(coord))
  bbox.y = bbox.y.map(coord => mercatorYfromLat(coord))
  return bbox
}