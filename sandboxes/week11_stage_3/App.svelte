<script>
  import { scaleOrdinal } from 'd3-scale'
  import { schemeAccent } from 'd3-scale-chromatic'
  import { plnAreas } from './planning_areas.js'
  import { hexGrid } from './hex_grid.js'
  import { Graphic, PolygonLayer, createGeoScales } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'

  // load data
  const hex = new DataContainer(hexGrid)
  console.log(hex)
  // set up scales

  // 1. position
  const myGeoScale = createGeoScales(hex.domain('$geometry'))

  // 2. fill color
  const myColorScale = scaleOrdinal()
    .domain(hex.domain('REGION_N'))
    .range(schemeAccent)
</script>

<div class="graph">
  <div class="main-chart">
    <Graphic {...myGeoScale} flipY>
      <PolygonLayer 
        geometry={hex.column('$geometry')}
        stroke={'white'}
        strokeWidth={1} 
        fill={hex.map('REGION_N', myColorScale)}
      />
    </Graphic>
  </div>
</div>

<style>

</style>