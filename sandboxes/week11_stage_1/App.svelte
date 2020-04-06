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
  
</script>

<div class="graph">
  <div class="main-chart">
    <Graphic>
    </Graphic>
  </div>
</div>

<style>

</style>