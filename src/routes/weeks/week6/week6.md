---
solution: true
---
# Week 6: Declarative Programming II (Svelte cont'd + D3)

## Introduction
In the previous block, we have started to get familiar with Svelte's approach to writing declarative 'components' that allow us to combine HTML and JS in more convenient ways than the imperative approach we used in Week 3 & 4. So far, we have been able to re-create Du Bois original chart by utilizing Svelte's template syntax and the `each` block.

In this week, we will cover the remaining essentials of Svelte's template syntax by adding event handlers (the Svelte way) to our chart. We will also introduce the use and importing of other JavaScript libraries – specifically by replacing our original 'pixel' measurement for population by a scaled version of the raw population number. We will do this by utilizing part of the [d3.js ecosystem](https://d3js.org/). Finally, we will try and 'abstract' a part of our chart into a reusable component. This is a way to make Svelte code more modular and structured – similar to how we used our own functions to structure and refactor JS code.

## Template Syntax: Event Handlers
In Week 4, we used the JS function `addEventListener` to add listeners for specific mouse interactions to specific HTML elements. Svelte provides a more convenient way to do this with its template syntax. We can use the [on:eventname directive](https://svelte.dev/docs#on_element_event) to achieve the same result. To place an event handler on, say, a `<rect>` element in an SVG, we can use the following syntax.

```svelte
<script>
// 
function doSomething () {
  console.log('I have been clicked')
}
</script>

<svg>
  <rect on:click={doSomething} />
</svg>
```

Let's use Svelte's template syntax to get a better feel for how we can build user interactions into our chart and walk-through the following steps.

1. Log a specific message (e.g. 'I have been clicked') to the console when any of the rectangles in our chart are clicked.
2. Extend the logic in step 1 by changing the `x` position of the rectangle on every click, making all bars jump right.
3. Extend the logic in step 1 logging a rectangle-specific message (e.g. 'In [year of click] there were [population] African-Americans in the US') to the console. Hint: you will need to utilize an anonymous function to achieve this.

::: div callout
We will do this section in class together.
<iframe title="IDV Week 6 Event Handlers" width="560" height="315" src="https://www.youtube-nocookie.com/embed/D70voO7_QqA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution
::: codesandbox sandboxes/week6_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::

## Template Syntax: If Blocks
Now that we have a convenient way to use events in Svelte templates, let's re-assess the extra exercise we did in Week 4. The goal is to replace the original caption text with a static text that says 'Hover over each rectangle to find out more...'. We will then implement a bit of logic that gets executed upon hovering over the bar elements and changes the caption to the following text:

```
In [year] there were [population in year] African-Americans in the United States of America.
This constitutes a [% increase compared with previous decade]% compared with the population 10 years earlier;
and a [% increase compared with 1750]% increase compared with the population of African-Americans in 1750.
```

To make this happen, we will use another one of Svelte's special template syntax abilities: the [if block](https://svelte.dev/docs#if). An if block can be used to conditionally render HTML markup based on the evaluation of some JS expression. The syntax looks similar to the `each` block syntax we have seen before.

```svelte
{#if variable > 0}
  <p>
  This paragraph will only display if the value
  of 'variable' is greater than zero.
  </p>
{/if}
```

We can utilize the if block to switch between the 'Hover over' placeholder and the hover-year-specific text. To construct the dynamic bits of the caption (e.g. year, population) that appears after hovering, we can use Svelte's regular curly braces (`{ }`).

::: div callout
We will do this section in class together.
<iframe title="IDV Week 6 If Blocks" width="560" height="315" src="https://www.youtube-nocookie.com/embed/IFT0T1dHRR8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution
::: codesandbox sandboxes/week6_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::

## Reactive statements and variables
The template syntax for our caption seems to work OK but it is becoming a bit unwieldy already – and we haven't even implemented a nice rounding function for 'pretty' percentages. Wouldn't it be nice if we can calculate the required percentage changes and store them in JavaScript variables? There is nothing that is stopping us to do that but, as you will notice if you try, the required calculation will only be run once when we create our variable binding but will not be updated when the user hovers to a new rectangle. We can solve this by using *reactive* statements.

[Reactive statements](https://svelte.dev/docs#3_$_marks_a_statement_as_reactive) will update themselves whenever one of their dependencies updates (so you don't have to keep track of these yourself!). We can mark statement as reactive by starting the line with `$:`. So the statement:

```svelte
$: console.log(activeIndex)
```

Will log the value of `activeIndex` whenever the variable binding has been updated. We can use the same logic to create two new variables, `relChangePrevDecade` and `relChangeFirstDecade`, that will automatically get updated whenever the user hovers over a new rectangle. We will implement this using the following steps:

1. Refer to the two new variables (`relChangePrevDecade` and `relChangeFirstDecade`) from within the caption template syntax.
2. Create a function to calculate percentage increases.
3. Use [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) to round the percentages to a pretty number.
4. Use this function to *reactively* update the `relChangePrevDecade` and `relChangeFirstDecade` variables.

::: div callout
We will do this section in class together.
<iframe title="IDV Week 6 Reactive Statements" width="560" height="315" src="https://www.youtube-nocookie.com/embed/SBJIb887tQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution
::: codesandbox sandboxes/week6_stage_3 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::

## Scales & Importing Libraries (D3)
Up until now, we have always relied on measuring the exact width of the rectangles in the original Du Bois chart to know how many pixels wide to make our recreation. However, in most practical scenarios we aren't recreating a chart but rather expressing a particular dataset or variable in a visual way. In that case, we somehow need to translate the data values to some aesthetic or 'channel' value (cf. VAD Chapter 5). We do this through a process that is often referred to as 'mapping' or 'scaling': we map the values in the data 'space' to values in the screen or pixel 'space'. One of the available tools that makes this much easier is [d3-scale](https://github.com/d3/d3-scale). As you might already know, [d3.js](https://d3js.org/) is one of the key tools for browser-based visualization. What is less-known is that d3 consists of an entire ecosystem of smaller, modular tools and depending on your needs you might want to use some, or many of them (read [Elijah Meek's clear explanation of this](https://medium.com/@Elijah_Meeks/d3-is-not-a-data-visualization-library-67ba549e8520) if you're interested).

For now, we will only use a small part of the d3 universe, namely [its scaling utility](https://github.com/d3/d3-scale). `d3-scale` allows us to define a scaling or mapping function that will transform a data value (say 220,000 people) to a pixel value (say 17 pixels). We do this by giving it the 'domain' of our data (the minimum and maximum value) and the 'range' of our pixel space (the width of our graph).

Before we can apply this in practice, we will need to install and import the `d3-scale` library. Installing new libraries in Svelte projects (and other JS-based projects), can be done by running `npm install [name of library]`. So in this case, in your terminal, run:

```bash
npm install d3-scale
```

What happens now is that `npm` will search online for the correct library, it will download it to the right location (so it's available in your project) and it will add a reference in your `package.json` file (so it will be installed with all other dependencies every time you run `npm install`).

After you have installed a library, you can make it available in your component by using the [import statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) in the JS `<script>` section of the component.

```js
import { scaleLinear } from 'd3-scale'
```

The above will only import the `scaleLinear` function ([docs](https://github.com/d3/d3-scale#continuous-scales)) from the library and will make it available as `scaleLinear` for use anywhere in your script. We can now use it to construct a new scale.

```js
const widthScale = scaleLinear()
                    .domain([0, 7470040])
                    .range([0, 407])
```

Now that we have scaling function, we can use to draw the width of the `<rect>` elements based on the actual `population` variable, rather than the `population_pixel` variable.

::: div callout
We will do this section in class together.
<iframe title="IDV Week 6 Importing Libraries & D3 Scales" width="560" height="315" src="https://www.youtube-nocookie.com/embed/b5PMeSlTE3I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: solution
::: codesandbox sandboxes/week6_stage_4 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::

## Component Abstraction
Until now, we have written our entire visualization in a single, large component (called `App.svelte`). But we don't have to. Svelte allows us to build our application from as many smaller components as we'd like. All we need to do is creating a new `.svelte` file and `import` that file/component with the same syntax as we previously used to import `d3-scale`.

We can use this to extract the graphical 'bar element' group into its own component. This will make our code easier to read, and it allows us to re-use the bar element in other projects more easily as well. To do that, we need to walk through the following steps:

1. Create a new file `BarElement.svelte` in the same folder as `App.svelte` and import it in `App.svelte` with the following syntax:
```js
import BarElement from './BarElement.svelte'
```
2. Move all the markup related to our bar element to the newly created `BarElement.svelte` file. Basically this entire section:
```svelte
<g>
  <text class="graph-text" x={yearXPosition} y={yPos(i)} dy={10}>{item.year}</text>
  <text class="graph-text" x={separatorXPosition} y={yPos(i)} dy={10}>–</text>
  <text class="graph-text" x={populationXPosition} y={yPos(i)} dy={10} text-anchor="end">
    {item.population}
  </text>
  <rect
    on:mouseover={() => respondToClick(i)}
    on:mouseout={() => respondToClick('reset')}
    class="bar" x={barXPosition}
    y={yPos(i)}
    height={barHeight}
    width={widthScale(item.population)}
  />
</g>
```
3. We can define the available properties on our new bar element component with the `export let` syntax (see the [Svelte docs](https://svelte.dev/docs#1_export_creates_a_component_prop)). Decide which properties should be made available in this way, and give them the appropriate names.
4. In `App.svelte` use the imported `BarElement` and give it the right properties. Note that Svelte has a handy shorthand if the attribute and value names match.
```svelte
<!-- long hand -->
<BarElement item={item} />

<!-- short hand -->
<BarElement {item} />
```
5. CSS in Svelte components only applies to the markup in that specific component. This means that we need to move the CSS related to bar elements to the `BarElement.svelte` file instead.
6. Set the right event handlers on the `BarElement` within `App.svelte` and make sure the same events are emitted from the `<rect>` element in `BarElement.svelte`.

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week6_stage_5 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::