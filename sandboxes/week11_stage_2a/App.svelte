<script>
  import { scaleOrdinal } from 'd3-scale'
  import { schemeAccent } from 'd3-scale-chromatic'
  import { plnAreas } from './planning_areas.js'
  import { hexGrid } from './hex_grid.js'
  import { Graphic, PolygonLayer, createGeoScales } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'

  // load data
  const planningAreas = new DataContainer(plnAreas)
  console.log(planningAreas)
  
  // set up scales

  // 1. position
  const myGeoScale = createGeoScales(planningAreas.domain('$geometry'))

</script>

<div class="graph">
  <div class="main-chart">
    <Graphic {...myGeoScale} flipY>
      <PolygonLayer 
        geometry={planningAreas.column('$geometry')}
        stroke={'white'}
        strokeWidth={1}
      />
    </Graphic>
  </div>
</div>

<style>

</style>