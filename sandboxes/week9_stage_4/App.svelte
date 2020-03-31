<script>
  import { scaleLinear, scaleBand } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Section, RectangleLayer, XAxis, YAxis } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  
  const sales = new DataContainer(data)
  const salesPerType = sales
    .groupBy('flat_type')
    .summarise({ total_count: { resale_price: 'count' } })

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
        padding={{ left: 90, bottom: 20, top: 10, right: 10 }}
        scaleX={scaleLinear().domain(salesPerType.domain('total_count'))}
        scaleY={scaleBand().domain(salesPerType.domain('flat_type')).padding(0.5)}
        flipY
      >
        <RectangleLayer 
          x1={0}
          x2={salesPerType.column('total_count')}
          y1={salesPerType.column('flat_type')}
          y2={({ scaleY }) => salesPerType.map('flat_type', ft => scaleY(ft) + scaleY.bandwidth())}
        />
        <XAxis labelFontSize={8} />
        <YAxis labelFontSize={8} />
      </Section>
      <Section
        x1={425}
        x2={825}
        y1={0}
        y2={400}
        backgroundColor="yellow"
      >
        <!-- contents of 2nd section -->
      </Section>
       <Section
        x1={0}
        x2={400}
        y1={425}
        y2={825}
        backgroundColor="blue"
      >
        <!-- contents of 3rd section -->
      </Section>
      <Section
        x1={425}
        x2={825}
        y1={425}
        y2={825}
        backgroundColor="red"
      >
        <!-- contents of 4th section -->
      </Section>
    </Graphic>
  </div>
</div>

<style>

</style>