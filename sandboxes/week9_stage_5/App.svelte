<script>
  import { scaleLinear, scaleBand, scaleTime } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Section, PointLayer, RectangleLayer, Line, XAxis, YAxis } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  
  // overall settings
  const padding = { left: 90, bottom: 30, top: 0, right: 10 }
  const color = 'rgb(93, 134, 156)'

  // entire dataset
  const sales = new DataContainer(data)

  // data for facet 1
  const salesPerType = sales
    .groupBy('flat_type')
    .summarise({ total_count: { resale_price: 'count' } })

  // data for facet 2
  const salesDistribution = sales
    .bin({ groupBy: 'resale_price', method: 'EqualInterval', numClasses: 20 })
    .summarise({ total_count: { resale_price: 'count' } })

  // data for facet 4
  const salesOverTime = sales
    .groupBy("month")
    .summarise({ mean_price: { resale_price: "mean" } })
    .arrange({ month: "ascending" }) // sort by month (otherwise line will criss-cross)
    .mutate({ month_as_date: row => new Date(row.month) }); // convert to proper date so we can use date scale

</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    <Graphic width={825} height={825}>
      <Section
        x1={0}
        x2={400}
        y1={0}
        y2={400}
        {padding}
        flipY
        scaleX={scaleLinear().domain([0, salesPerType.domain('total_count')[1]])}
        scaleY={scaleBand().domain(salesPerType.domain('flat_type')).padding(0.5)}
      >
        <RectangleLayer 
          x1={0}
          x2={salesPerType.column('total_count')}
          y1={salesPerType.column('flat_type')}
          y2={({ scaleY }) => salesPerType.map('flat_type', ft => scaleY(ft) + scaleY.bandwidth())}
          fill={color}
        />
        <XAxis labelFontSize={8} title="Count" />
        <YAxis labelFontSize={8} title="Flat Type" />
      </Section>
      <Section
        x1={425}
        x2={825}
        y1={0}
        y2={400}
        {padding}
        flipY
        scaleX={scaleLinear().domain(salesDistribution.domain('bins'))}
        scaleY={scaleLinear().domain([0, salesDistribution.domain('total_count')[1]])}
      >
        <RectangleLayer 
          x1={salesDistribution.map('bins', bin => bin[0])}
          x2={salesDistribution.map('bins', bin => bin[1])}
          y1={0}
          y2={salesDistribution.column('total_count')}
          fill={color}
        />
        <XAxis tickCount={5} labelFontSize={8} title="Resale Price"/>
        <YAxis labelFontSize={8} title="Count"/>
      </Section>
       <Section
        x1={0}
        x2={400}
        y1={425}
        y2={825}
        {padding}
        flipY
        scaleX={scaleLinear().domain(sales.domain('floor_area_sqm'))}
        scaleY={scaleLinear().domain(sales.domain('resale_price'))}
      >
        <PointLayer
          x={sales.column('floor_area_sqm')}
          y={sales.column('resale_price')}
          fill={color}
          opacity={0.1}
        />
        <XAxis tickCount={6} labelFontSize={8} title="Floor Area (sqm)"/>
        <YAxis labelFontSize={8} title="Resale Price"/>
      </Section>
      <Section
        x1={425}
        x2={825}
        y1={425}
        y2={825}
        {padding}
        flipY
        scaleX={scaleTime().domain(salesOverTime.domain('month_as_date'))}
        scaleY={scaleLinear().domain(salesOverTime.domain('mean_price'))}
      >
        <Line
          x={salesOverTime.column('month_as_date')}
          y={salesOverTime.column('mean_price')}
          stroke={color}
          strokeWidth={2}
        />
        <XAxis tickCount={3} labelFontSize={8} title="Date"/>
        <YAxis labelFontSize={8} title="Mean Resale Price"/>
      </Section>
    </Graphic>
  </div>
</div>

<style>

</style>