<script>
  import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
  import { Graphic, Point, Line } from '@snlab/florence'
  import { data } from './miserables.js'
  
  const width = 500
  const height = 500

  let links = [...data.links]
  let nodes = [...data.nodes]

  const simulation = forceSimulation(nodes)
      .force("link", forceLink(links).id(d => d.id))
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2))
      .on("tick", () => {
        nodes = nodes
        links = links
      })

</script>


<div class="graph">
  <div class="main-chart">
    <!-- main chart -->
    <Graphic {width} {height}>
      {#each nodes as node}
        <Point
          x={node.x}
          y={node.y}
        />
      {/each}
      {#each links as link}
        <Line
          x={[link.source.x, link.target.x]}
          y={[link.source.y, link.target.y]}
          strokeWidth={1}
        />
      {/each}
    </Graphic>
  </div>
</div>