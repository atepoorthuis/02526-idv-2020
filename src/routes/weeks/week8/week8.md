---
solution: true
---
# Week 8: A Grammar of Graphics I (Florence - a grammar for Svelte)

## Introduction
In the previous weeks we covered the basics of using HTML, SVG, JS and CSS to construct visualizations in the browser. With the addition of Svelte as a reactive framework, we have a powerful arsenal of tools to help us create all kinds of different visualizations. However, creating even a simple scatter plot can be quite tedious with these basic tools as they are relatively 'low-level' and are not specifically geared towards data visualization. In other words, it would be great if we had another system or library that would make creating visualizations based on data a bit more convenient.

Lucky for us, many such approaches and frameworks exist. The behemoth in this space is _d3_, which is short for ['data driven documents'](https://d3js.org/). Started in 2011 by Mike Bostock, it has evolved into a universe of small modular libraries that are incredibly useful for [all facets of data visualization](https://medium.com/@Elijah_Meeks/d3-is-not-a-data-visualization-library-67ba549e8520). D3 does not use a plug-and-play approach - you can't just say 'make a scatterplot of my data' but instead need to give it relatively minute instructions.

On the other end of the spectrum, we have charting libraries that are very high-level: they make it simple to construct visualization _idioms_ with only a few lines of code, for example [charts.js](https://www.chartjs.org/) and Baidu's [echarts](https://echarts.apache.org/). The latter category is useful if you want to make a quick chart but offers, as a result, fewer options for customization, especially if you're interested in building a visualization system.

There are some midway approaches as well. For example, the Interactive Data Lab at UW has built a very powerful visualization language called [Vega](https://vega.github.io/vega/). Vega (and its high-level sibling [Vega-Lite](https://vega.github.io/vega-lite/)) uses d3 under the hood but provides a specification language (in JSON) that is more specifically catered towards visualization design. The theoretical system that approaches like Vega and other (e.g `ggplot2` within the R universe) are using is often referred to as a grammar of graphics.

Specifying a visualization as a JSON configuration specification can be counterintuitive and, more importantly, moves us away from the syntax familiar to us from plain HTML/SVG and Svelte templates. For this reason, in this course, we will make use of a [visualization library](https://github.com/spatialnetworkslab/florence), `florence` that is built with the same philosophy on visualization design (i.e. the grammar of graphics) but does this _on top of_ Svelte's template syntax. In this way, you can use everything you have learned so far and use the system provided by the `florence` and the grammar of graphics to make more advanced visualizations easily.

## Using Florence
Florence is built on top of Svelte's component model. This means that Florence exports a series of small, modular building blocks that you can import to help build your visualizations. Just like with our use of `d3-scale`, we first have to install `florence` in our local project. We can do so by running `npm install @snlab/florence`.

After you install `florence`, you can `import` it in your Svelte components as per usual. The below sandbox has `florence` installed and ready for your use. 

::: codesandbox sandboxes/week8_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

## Core components
Florence is built on top of the grammar of graphics. You will see many familiar concepts fly by: scales, marks, aesthetics etc. So how do we get started with, say, visualizing our data from the Du Bois chart with this system?

The first key component that we need to import is the `Graphic`. Every Florence graphic starts with [the Graphic component](https://florence-docs.netlify.com/docs/core/graphic). Think of it as a supercharged svg root element.

We can import the Graphic component into our project like so: 

```js
import { Graphic } from '@snlab/florence'
```

After importing we can use it within HTML markup as per normal:

```svelte
<div class="main-chart">
  <!-- main chart -->
  <Graphic width={500} height={500}>
  </Graphic>
</div>
```

When you inspect the DOM, you will see that all this has done so far is to create an SVG element with some default attributes.

To start drawing something, we need to use Marks. Florence provides all the marks you need to make visualizations: [points](https://florence-docs.netlify.com/docs/marks/point), [symbols](https://florence-docs.netlify.com/docs/marks/symbol), [rectangles](https://florence-docs.netlify.com/docs/marks/rectangle), [areas](https://florence-docs.netlify.com/docs/marks/area), [polygons](https://florence-docs.netlify.com/docs/marks/polygon), [lines](https://florence-docs.netlify.com/docs/marks/line), and [labels](https://florence-docs.netlify.com/docs/marks/label). These might seem simple, but together they can build very advanced visualization – a bit like how modern games are basically a giant collection of triangles!

For now, let's just use the `Point` mark. From its documentation we know that it needs an `x` and `y` property. Let's try to plot a point in the middle of our Graphic.

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week8_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Using scales
So far, we have positioned things within our graphic using pixel values (i.e. a x value of `100` will be placed at the 100 pixels away from the origin). But we already know that scaling is an essential step for any visualization that is based on data (it is called 'data visualization' after all!). To make that process easier, Florence has a built-in understanding of scales to help us create a [local coordinate system](https://florence-docs.netlify.com/docs/concepts/local-coordinates). Basically, what this means is that we can stop thinking and working with pixels but instead work with the actual data values. We will put this in practice for our Du Bois chart.

Our data has two variables: `year` and `population`. So far we have plotted population on y-axis, following Du Bois, but today it is much more common to have time on the x-axis. We will create two scales for our data, using `d3-scale`. We will only specify the 'domain' (the min/max of our data). We don't need to add the 'range' (the min/max of our screen pixel space) as we are going to let Florence figure that out.

```js
const scaleX = scaleLinear().domain([1740, 1900])
const scaleY = scaleLinear().domain([0, 8000000])
```

Once we have the scales set up, we can supply them to the Graphic to create a local coordinate system.

```svelte
<div class="main-chart">
  <!-- main chart -->
  <Graphic width="500" height="500" {scaleX} {scaleY}>
  </Graphic>
</div>
```

In the previous section we placed a point by specifying 'pixel space'. We can now place points in 'data space'. For example, to place a point at the year 1800, with a population of 6 million, we can do:

```svelte
<div class="main-chart">
  <!-- main chart -->
  <Graphic width={500} height={500} {scaleX} {scaleY}>
    <Point x={1800} y={6000000}>
  </Graphic>
</div>
```

Now that we have placed a single point, let's see if we can extend this logic to place all our data points.


::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week8_stage_3 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Axis
To help the reader orient themselves, of course it makes sense to add some axes. Florence has two components for [x axes](https://florence-docs.netlify.com/docs/guides/xaxis) and [y axes](https://florence-docs.netlify.com/docs/guides/yaxis). They offer all kinds of options to customize your axes but the defaults are often OK to start with. You can simply add an axes by including it _within_ the Graphic. It will infer the appropriate scale from its parent Graphic automatically and try to set up some decent tick marks etc.

```svelte
<Graphic {scaleX} {scaleY} flipY>
  <!-- snip -->
  <XAxis />
  <YAxis />
</Graphic>
```

You will immediately see that the axes don't completely display. This is because there's currently no space available between the edge of the Graphic and the start of the data/content. Think about it like this: you want your axis to be _outside_, on the edge of the data visualization. But right now the visualization connects seamlessly to the edge of the Graphic. To solve that, we need to create some space between the data content and the edge of the Graphic. We can do this by adding some `padding` on the Graphic.

```svelte
<Graphic {scaleX} {scaleY} flipY padding={60}>
  <!-- snip -->
  <XAxis />
  <YAxis />
</Graphic>
```

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week8_stage_4 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Additional marks
We have now recreated a very basic version of our Du Bois chart. One of the advantages of the grammar of graphics is that it becomes easy to switch to different marks. Let's try to replace our original Point mark with the following other marks:

- [Label](https://florence-docs.netlify.com/docs/marks/label)
- [Rect](https://florence-docs.netlify.com/docs/marks/rectangle)
- [Line](https://florence-docs.netlify.com/docs/marks/line)
- The linear scale we are using for years does not replace 'pretty' tick marks by default. Let's replace it with a [temporal scale](https://github.com/d3/d3-scale#time-scales)

::: div callout
We will do this section in class together.
:::

::: solution
To replace the original Point mark with a Label mark, all we need to do is import the correct mark and supply it with its required properties. In addition to `x` and `y` that we also used for Point, we also need to supply an actual `text` to display for each label.

::: codesandbox sandboxes/week8_stage_5 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::

To display a bar or rectangle for each year, we need to define both the starting as well as the end point on the x axis. In practice, we can use d3's [band scale](https://github.com/d3/d3-scale#band-scales) to do this. But since we know that each observation is for one decade, we just make the bars 5 years wide as an easier shortcut.

::: codesandbox sandboxes/week8_stage_6 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::

To display a single line instead of individual points changes the nature of our visualizations: instead of 1 data point -> 1 mark, we now visualize many data points -> 1 mark. To do that, we need to supply an array of _all_ x values and an array of _all_ y values to a single line mark. We can this using the Javascript's [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method that allows us to create a new array from our original `data` array with the right properties (year and population respectively) extracted.

::: codesandbox sandboxes/week8_stage_7 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::

Finally, to change from a simple linear scale based on the integer of the year, we bring in d3's [temporal scale](https://github.com/d3/d3-scale#time-scales). To do this, we also need to convert the year values to a [proper JavaScript Date type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

::: codesandbox sandboxes/week8_stage_8 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::

:::
