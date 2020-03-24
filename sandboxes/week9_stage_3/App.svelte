<script>
  import { scaleLinear } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Section } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'
  
  const sales = new DataContainer(data)

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
        backgroundColor="green"
      >
        <!-- contents of 1st section -->
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