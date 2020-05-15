<script>
  import Map from './components/Map.svelte'
  import MapMarker from './components/MapMarker.svelte'
  import MapWithFlorence from './components/MapWithFlorence.svelte'

  import { Graphic, Point, createGeoScales } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'

  import { projectMapboxMercator, projectBbox } from './utils/mapbox-florence-bridge-utils.js'
  
  // map related init constants
  const width = 250
  const height = 250
  const center = [103.8198, 1.3521]
  const zoom = 10

  // geo scale related vars
  let myGeoScale
  let myGeoScaleInit
  let originalBbox
  let scaleX
  let scaleY
  let zoomIdentity = { x: 0, y: 0, kx: 1, ky: 1 } // init zoom identity for 'zoom' version

  // load data
  const dorms = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: { Name: 'Dorm A' }, geometry: { type: 'Point', coordinates: [103.8721611, 1.3038701] } },
      { type: 'Feature', properties: { Name: 'Dorm B'}, geometry: { type: 'Point', coordinates: [103.8436414, 1.2940554] } },
      { type: 'Feature', properties: { Name: 'Dorm C'}, geometry: { type: 'Point', coordinates: [103.8271663, 1.3059254] } },
    ]
  }

  const dormContainer = new DataContainer(dorms)

  // mapbox gl takes in coordinates as unprojected WGS84 (EPSG 4326) but projects to (a modified)
  // version of Web Mercator (EPSG 3857)
  // we project our WGS84 data to the same projection
  // so we can 'match' that projection in our Florence overlay
  const dormContainerProjected = dormContainer.reproject(projectMapboxMercator)

  
  // functions to create scales and update bounds for 'naive' implementation
  function setScalesNaive (event) {
    const mapInstance = event.detail
    const bbox = projectBbox(mapInstance.getBounds())
    myGeoScale = createGeoScales(bbox)
  }


  function updateBounds (event) {
    const bbox = projectBbox(event.detail)
    myGeoScale = createGeoScales(bbox)
  }


  // functions to create scales and update bounds for 'zoom' implementation
  function setScalesZoom (event) {
    const mapInstance = event.detail
    const bbox = projectBbox(mapInstance.getBounds())
    myGeoScaleInit = createGeoScales(bbox)
    originalBbox = bbox
    scaleX = myGeoScaleInit.scaleX.range([0, width])
    scaleY = myGeoScaleInit.scaleY.range([0, height])
  }

  function updateZoom (event) {
    calculateZoomIdentity(originalBbox, projectBbox(event.detail), zoomIdentity)
  }  

  function calculateZoomIdentity(original, current) {
    const deltaX = scaleX(original.x[0]) - scaleX(current.x[0])
    const deltaY = scaleY(original.y[0]) - scaleY(current.y[0])
    const zoom = (original.x[1] - original.x[0]) / (current.x[1] - current.x[0])
    const zoomId = { x: deltaX * zoom, y: deltaY * zoom, kx: zoom, ky: zoom }
    zoomIdentity = zoomId
  }

</script>

<!-- mapbox gl native -->
<!-- adapted from https://svelte.dev/examples#context-api -->
<Map {center} {zoom} {width} {height}>
  {#each dorms.features as dorm}
    <MapMarker feature={dorm} label={dorm.properties.Name} />
  {/each}
</Map>

<!-- mapbox + florence svg + naive sync -->
<div class='container'>
  <div class='map'>
    <MapWithFlorence on:load={setScalesNaive} on:pan={updateBounds} on:zoom={updateBounds} {center} {zoom} {width} {height}>
    </MapWithFlorence>
  </div>
  <div class='overlay'>
    <Graphic {width} {height} {...myGeoScale}>
      {#each dormContainerProjected.rows() as dorm}
        <Point onMouseover={(event) => console.log(event)} geometry={dorm['$geometry']} />
      {/each}
    </Graphic>
  </div>
</div>

<!-- mapbox + florence svg + zoom sync -->
<div class='container'>
  <div class='map'>
    <MapWithFlorence on:load={setScalesZoom} on:pan={updateZoom} on:zoom={updateZoom} {center} {zoom} {width} {height}>
    </MapWithFlorence>
  </div>
  <div class='overlay'>
    <Graphic {width} {height} {...myGeoScaleInit} {zoomIdentity}>
      {#each dormContainerProjected.rows() as dorm}
        <Point onMouseover={(event) => console.log(event)} geometry={dorm['$geometry']} />
      {/each}
    </Graphic>
  </div>
</div>

<style>
.container {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

</style>
