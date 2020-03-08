 <script>
    export let yearXPosition
    export let separatorXPosition
    export let populationXPosition
    export let barXPosition
    export let barHeight
    export let barWidth
    export let yPos
    export let item
</script>
 
 <g>
    <text class="graph-text" x={yearXPosition} y={yPos} dy={10}>{item.year}</text>
    <text class="graph-text" x={separatorXPosition} y={yPos} dy={10}>–</text>
    <text class="graph-text" x={populationXPosition} y={yPos} dy={10} text-anchor="end">
    {item.population}
    </text>
    <rect
    on:mouseover
    on:mouseout
    class="bar" x={barXPosition}
    y={yPos}
    height={barHeight}
    width={barWidth}
    />
</g>

<style>
  /* graph elements */
  .graph-text {
    font-family: "Teko", sans-serif;
    font-weight: 600;
    font-size: 15px;
    fill: rgb(60, 60, 60);
  }

  .bar {
    fill: rgb(167, 68, 87);
  }
</style>