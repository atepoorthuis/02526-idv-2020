<script>
  import { scaleSequential, scaleThreshold } from 'd3-scale'
  import { schemeOranges } from 'd3-scale-chromatic'
  import { hexGrid } from './hex_grid.js'
  import { Graphic, PolygonLayer, createGeoScales } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'

  // load data
  const hex = new DataContainer(hexGrid)
  const hexWithoutNull = hex.filter(row => row.mean_price !== null)
  console.log(hex)
  // set up scales

  // 1. position
  const myGeoScale = createGeoScales(hex.domain('$geometry'))

  // 2. class breaks
  const numClasses = 6
  const classBins = hexWithoutNull
    .bin({ groupBy: 'mean_price', method: 'EqualInterval', numClasses: numClasses })
    .column('bins')
  const classThresholds = binsToThreshold(classBins)

  function binsToThreshold (bins) {
    const thresholds = []
    for (let index = 1; index < bins.length; index++) {
      const bin = bins[index]
      thresholds.push(bin[0])
    }
    return thresholds
  }
  console.log(classBins, classThresholds)
  // 2. fill color
  const myColorScale = scaleThreshold()
    .domain(classThresholds)
    .range(schemeOranges[numClasses])
</script>

<div class="graph">
  <div class="main-chart">
    <Graphic {...myGeoScale} flipY>
      <PolygonLayer 
        geometry={hex.column('$geometry')}
        stroke={'white'}
        strokeWidth={1} 
        fill={'#E0E0E0'}
      />
      <PolygonLayer 
        geometry={hexWithoutNull.column('$geometry')}
        stroke={'white'}
        strokeWidth={1} 
        fill={hexWithoutNull.map('mean_price', myColorScale)}
      />
    </Graphic>
  </div>
</div>

<style>

</style>