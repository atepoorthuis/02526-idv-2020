<script>
  import { scaleLinear } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, PointLayer, Line, XAxis, YAxis } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  import { regressionLinear } from 'd3-regression'
  
  const sales = new DataContainer(data)

  const scaleX = scaleLinear().domain(sales.domain('floor_area_sqm'))
  const scaleY = scaleLinear().domain(sales.domain('resale_price'))

  // the regressionLinear returns another function, which
  // when given a row-wise data object
  // will calculate the regression line

  // step 1 create regression function
  const regression = regressionLinear()
  .x(d => d.floor_area_sqm) // these are called 'accessors'
  .y(d => d.resale_price) // they tell the function where to find the x/y columns

  console.log('regression function', regression)

  // step 2 provide the data as an argument to the newly created function
  const regressionLine = regression(sales.rows())
  // we use the .rows() method because regression expects row-based data
  // data container is column-based by default

  console.log('regression line', regressionLine)
  // note that the regression line returns a bunch of things (rsq etc)
  // it also contains the first and last point of the regression line
  // regressionLine[0] is the first point
  // regressionLine[0][0] is the x coord of the first point
  // regressionLine[0][1] is the y coord of the first point
  // regressionLine[1] is the second point
  // etc
</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    <Graphic {scaleX} {scaleY} padding={70} flipY>
      <PointLayer x={sales.column('floor_area_sqm')} y={sales.column('resale_price')} opacity={0.1} />
      <Line 
        x={regressionLine.map(point => point[0])}
        y={regressionLine.map(point => point[1])}
      />
      <XAxis title="Floor area" />
      <YAxis title="Resale price" />
    </Graphic>
  </div>
</div>