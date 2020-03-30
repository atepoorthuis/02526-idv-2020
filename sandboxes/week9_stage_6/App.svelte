<script>
  import { scaleLinear } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Section, Grid, Title, PointLayer, XAxis, YAxis } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  
  const padding = { left: 70, bottom: 40, top: 20, right: 20 }

  const sales = new DataContainer(data)
  const scaleX = scaleLinear().domain(sales.domain('floor_area_sqm'))
  const scaleY = scaleLinear().domain(sales.domain('resale_price'))

  const towns = ["TAMPINES", "SENGKANG", "PUNGGOL", "YISHUN"]
  const columns = 2
  const rows = Math.ceil(towns.length / columns)

  const salesPerTown = towns.map(town => sales.filter(row => row.town === town))
</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    <Graphic width={900} height={900}>
      <Grid
        {columns}
        {rows}
        viewGridTemplate
        areaNames={towns}
        let:cells>

        {#each towns as town, i}
          <Section
            {...cells[town]}
            {padding}
            {scaleX}
            {scaleY}
            flipY
          >
            <Title title={town} />
            <PointLayer x={salesPerTown[i].column('floor_area_sqm')} y={salesPerTown[i].column('resale_price')} opacity={0.5} />
            <XAxis title="Floor area" />
            <YAxis title="Resale price" />
          </Section>
        {/each}
      </Grid>
    </Graphic>
  </div>
</div>

<style>

</style>