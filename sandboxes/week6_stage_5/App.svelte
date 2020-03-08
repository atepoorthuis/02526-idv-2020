<script>
  import { scaleLinear } from 'd3-scale'
  import { data } from './data.js'
  import BarElement from './BarElement.svelte'

  // label position variables
  const yMarginTop = 18
  const yMarginBottom = 40
  const yearXPosition = 22.5
  const separatorXPosition = 70
  const populationXPosition = 153

  // bar variables
  const barXPosition = 165
  const barHeight = 11

  function yPos (index) {
    return yMarginTop + index * yMarginBottom
  }

  let activeIndex = ''
  let relChangePrevDecade
  let relChangeFirstDecade

  function respondToClick (index) {
    activeIndex = index
  }

  function relChange (oldValue, newValue) {
    const difference = newValue - oldValue
    const percentage = difference / oldValue * 100
    return Math.round(percentage)
  }

  $: if (activeIndex > 0) {
    relChangePrevDecade = relChange(data[activeIndex - 1].population, data[activeIndex].population)
    relChangeFirstDecade = relChange(data[0].population, data[activeIndex].population)
  }

  const widthScale = scaleLinear()
    .domain([0, 7470040])
    .range([0, 407])
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
    <svg id="chart" width="900" height="600">
      {#each data as item, i}
       <BarElement 
          {item} {yearXPosition} {separatorXPosition}
          {populationXPosition} {barXPosition} {barHeight}
          yPos={yPos(i)}
          barWidth={widthScale(item.population)}
          on:mouseover={() => respondToClick(i)}
          on:mouseout={() => respondToClick('reset')}
        />
      {/each}
      </svg>
  </div>
</div>

<div class="caption">
  <!-- footer content goes here -->
  {#if activeIndex > 0}
    <p>
      In {data[activeIndex].year} there were {data[activeIndex].population} African-Americans
      in the United States of America. This constitutes a
      { relChangePrevDecade }%
      compared with the population 10 years earlier; and a
      { relChangeFirstDecade }% increase
      compared with the population of African-Americans in 1750.
    </p>
  {:else if activeIndex === 0}
    <p>
      In {data[activeIndex].year} there were {data[activeIndex].population} African-Americans
      in the United States of America.
    </p>
  {:else}
    <p>
      Hover over each rectangle to find out more...
    </p>
  {/if}
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

  /* footer styling */
  .caption {
    width: 250px;
  }

  p {
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 500;
  }

  svg {
    margin-top: 10px;
  }

</style>