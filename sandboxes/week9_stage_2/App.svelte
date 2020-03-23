<script>
  import { scaleLinear } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, PointLayer, XAxis, YAxis } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  
  const sales = new DataContainer(data)

  const scaleX = scaleLinear().domain(sales.domain('floor_area_sqm'))
  const scaleY = scaleLinear().domain(sales.domain('resale_price'))
</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    <Graphic {scaleX} {scaleY} padding={70} flipY>
      <PointLayer x={sales.column('floor_area_sqm')} y={sales.column('resale_price')} opacity={0.1} />
      <XAxis title="Floor area" />
      <YAxis title="Resale price" />
    </Graphic>
  </div>
</div>

<style>

</style>