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

## lala

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week8_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::