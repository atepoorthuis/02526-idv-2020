<script>
  import { scaleLinear } from 'd3-scale'
  import { csvParse, autoType } from 'd3-dsv'
  import { Graphic, PointLayer, Line, XAxis, YAxis } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  
  // data vars
  let sales
  let scaleX
  let scaleY

  // we will load data asychronously so we need a variable to keep track of this
  // otherwise we will attempt to draw a graph without the data loaded
  // done is set to true once data is loaded, and only then we will start drawing
  let done = false
  
  async function loadCSV (url) {
    const response = await fetch(url)
    const data = await response.text()
    const dataParsed = csvParse(data, autoType)
    sales = new DataContainer(dataParsed)
    scaleX = scaleLinear().domain(sales.domain('floor_area_sqm'))
    scaleY = scaleLinear().domain(sales.domain('resale_price'))
    done = true
  }

  loadCSV('data/resale.csv')

</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    {#if done}
      <Graphic {scaleX} {scaleY} padding={70} flipY>
        <PointLayer x={sales.column('floor_area_sqm')} y={sales.column('resale_price')} opacity={0.1} />
        <XAxis title="Floor area" />
        <YAxis title="Resale price" />
      </Graphic>
    {/if}
  </div>
</div>