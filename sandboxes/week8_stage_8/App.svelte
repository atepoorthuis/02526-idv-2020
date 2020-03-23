<script>
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { data } from './data.js'
  import { Graphic, Line, XAxis, YAxis } from '@snlab/florence'

  const scaleX = scaleTime().domain([new Date(1740, 1, 1), new Date(1900, 1, 1)])
  const scaleY = scaleLinear().domain([0, 8000000])
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
    <Graphic {scaleX} {scaleY} padding={60} flipY>
        <Line x={data.map(item => new Date(item.year, 1, 1))} y={data.map(item => item.population)} />
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