---
solution: true
---
# Week 12: Project Studio

## Introduction
In the next two weeks, you will shift your focus to work on your final projects primarily. To aid in that, we have collectively selected a few topics, mostly of an applied or implementation character, to delve into a little deeper.

## The use of external libraries – especially those from the d3 universe
As you have noticed by now, developing visualizations for the web often involves the heavy use of external libraries. JavaScript is a bit  different in this regard to other programming languages because it often relies on small, micro libraries (shared via [npm](https://www.npmjs.com/)). Many of these contain only a few functions so larger projects might use and import dozens of such libraries. In order to make effective visualizations, it helps to be able to quickly parse and understand when & how to use these external libraries (in contrast to developing your own custom solution).

One of the anchor points in this large set of libraries is `d3` and everything that's built around it. If you search for data visualization resources online, you're bound to run into `d3` within the first few results. But what is `d3` exactly? As Elijah Meeks puts it: [d3 is not a visualization library](https://medium.com/@Elijah_Meeks/d3-is-not-a-data-visualization-library-67ba549e8520). Rather it's a collection of smaller utilities that you might need in the context of building visualizations. Depending on your use case, you will pick and choose which libraries you need.

For example, we have not needed any of the DOM manipulation functionality offered by [d3-selection](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection) because we have used Svelte's template syntax for that purpose instead. Similarly, to draw shapes or marks, we have relied on Florence's grammar of graphics system instead of, for example, [d3-shape](https://github.com/d3/d3/blob/master/API.md#shapes-d3-shape). On the other hand, we have made heavy use of the scaling functionality offered by [d3-scale](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale). Our approach with Svelte & Florence is completely compatible with this `d3` universe of libraries so we can choose to adopt libraries if and when we need to.

We will practice this adoption in the next few sections by using three additional d3 libraries.

## Regression 'lines' with d3-regression
The first library we will use is [d3-regression](https://github.com/HarryStevens/d3-regression). It is not part of the core or 'official' set of d3 libraries but is designed to be compatible and consistent with d3-related libraries (compare how R libraries are often designed to be consistent with the tidyverse).

`d3-regression` allows you to estimate the relationship between two variables. Importantly for visualization, it enables you to display a visual representation (e.g. 'fitted' line) of that relationship as well. Our HDB dataset has several variables that might exhibit some relationship. In this section, we will use `d3-regression` to add a fitted line to our scatterplot of price versus floor area. You can use the below sandbox as a starting point.

::: codesandbox sandboxes/week12_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::

Our goal is to import the `regressionLinear` function from `d3-regression` and use the [API documentation](https://github.com/HarryStevens/d3-regression#api-reference) to find out how to calculate and display a regression line in the scatterplot. We will walk through the following steps:

1. Import the appropriate function
2. Create a new regression 'generator', with the right 'x' and 'y' accessors
3. Feed our sales data to this generator, to calculate the regression line properties
4. Use the regression line properties to draw a `Line` in our scatter plot

::: div callout
We will do this section in class together.
<iframe title="IDV Week 12 14 April 2020" width="560" height="315" src="https://www.youtube-nocookie.com/embed/0mmNwVD8QLs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution show
::: codesandbox sandboxes/week12_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Importing CSV files with d3-dsv
So far, we have always imported data directly from `.js` files (which in turn exported a variable with the data in the right format). In practice, data often 'lives' in `.json` or `.csv` files that cannot be readily imported into a JavaScript application. You might remember that for smaller datasets we can convert things manually with online services like [Mr Data Converter](https://shancarter.github.io/mr-data-converter/) or export from R with [jsonlite](https://cran.r-project.org/web/packages/jsonlite/index.html). But for larger datasets, it is often more convenient to directly load the data into your project. To aid in this process, we can, again, use one of the `d3` libraries, in this case [d3-dsv](https://github.com/d3/d3-dsv).

This library allows us to parse or read CSV data into a format that we can work with within JavaScript. To use it, we will also need to use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to, well, actually fetch the external file or resource that holds our csv data. Using `fetch` also forces us to engage with one core concept of JavaScript that we have so far avoided: asynchronicity (see [Eloquent JavaScript Chapter 11](https://eloquentjavascript.net/11_async.html)). To make this a bit easier to work with, we will create an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to fetch our data.

In this section, we will replace our direct `import` of the HDB resale data with a process that will fetch and parse the data from a `.csv` file instead. The key steps are as follows:

1. Fetch the right file and store the results as raw text.
2. Use `d3-dsv` to parse the raw csv text.
3. Convert output of `d3-dsv` to a regular DataContainer.

You can use this sandbox as a starting point, which has the necessary libraries pre-installed and the csv data stored in the `public/data/` folder.

::: codesandbox sandboxes/week12_stage_3 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::

::: div callout
We will create a video to walk through these steps.
<iframe title="IDV Week 12 Importing CSV files with d3-dsv" width="560" height="315" src="https://www.youtube-nocookie.com/embed/n3OGUISAKUI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution
::: codesandbox sandboxes/week12_stage_4 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Creating network layouts with d3-force
So far, we have relied on a relatively straightforward scaling process to determine the positional attributes of Marks in our visualization. With network or graph data, this process is often much less straightforward. Graphs consists of nodes and edges, but neither nodes or edges have pre-determined absolute positions. The positions of nodes are often relative to other nodes, based on the edges that connect them. So to visualize this network of nodes and edges, we need a way to deduce an appropriate location. This can be done through all kinds of different approaches (cf. multi-dimensional scaling in CUA), but often we use a graph layout algorithm for this. You can find many JS libraries that offer this functionality – we will practice the process with the `d3-force` library as its use is largely consistent with the other libraries we have been using so far. In this section, we will walk through and replicate [Bostock's example with data from Les Miserables](https://observablehq.com/@d3/force-directed-graph?collection=@d3/d3-force). We will use `d3-force` for calculating the layout of the graph, but will keep using Svelte and Florence for actually drawing the graph. You can use the below sandbox as a starting point.

::: codesandbox sandboxes/week12_stage_5 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::


::: div callout
We will create a video to walk through these steps.
<iframe title="IDV Week 12 Creating network layouts with d3-force" width="560" height="315" src="https://www.youtube-nocookie.com/embed/OIW7h5I2xLU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution
::: codesandbox sandboxes/week12_stage_6 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Using turf for spatial operations
To be discussed in Thursday's live discussion on Microsoft Teams

## Publishing & sharing your project
To be discussed in Thursday's live discussion on Microsoft Teams

