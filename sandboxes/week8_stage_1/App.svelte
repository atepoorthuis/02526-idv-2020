<script>
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Point, Label, XAxis, YAxis } from '@snlab/florence'

  const scaleX = scaleLinear().domain([0, 7470040])
  const scaleY = scaleTime().domain([new Date(1740, 1, 1), new Date(1900, 1, 1)])
</script>


<div class="graph">
  <div class="title">
    <!-- title/header content goes here -->
    <h1>
      Increase of the Negro population in the United States of America.
    </h1>
    <h2>
      Accroissement de la population Negre aux Etats Unis d' Amerique.
    </h2>
    <h3>Done by Atlanta University</h3>
  </div>
  <div class="main-chart">
    <!-- main chart -->
    <Graphic {scaleX} {scaleY} padding={50}>
      {#each data as item}
       <Point x={item.population} y={new Date(item.year, 1, 1)} />
       <Label x={item.population + 300000} y={item.year} text={item.year} />
      {/each}
      <XAxis />
      <YAxis />
    </Graphic>
  </div>
</div>

<style>
  /* header styling */
  h1,
  h2,
  h3 {
    font-family: "Spectral", serif;
    font-weight: 200;
    text-align: center;
    color: rgb(60, 60, 60);
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 16px;
  }

  h3 {
    font-size: 14px;
  }

  /* overall graph dimensions */
  .graph {
    width: 750px;
    background-color: rgb(250, 239, 233);
    padding: 10px;
  }

  .title {
    width: 600px;
  }

</style>