<script>
  import { scaleLinear } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Point, XAxis, YAxis } from '@snlab/florence'

  const scaleX = scaleLinear().domain([0, 225])
  const scaleY = scaleLinear().domain([0, 1250000])
</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    <Graphic {scaleX} {scaleY} padding={70} flipY>
      {#each data as item}
       <Point x={item.floor_area_sqm} y={item.resale_price} opacity={0.1} />
      {/each}
      <XAxis title="Floor area" />
      <YAxis title="Resale price" />
    </Graphic>
  </div>
</div>

<style>

</style>