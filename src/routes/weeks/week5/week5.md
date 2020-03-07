---
solution: true
---
# Week 5: Declarative & Reactive Programming I (Introduction to Svelte)

## Introduction
In the previous block, we have started to get familiar with using JavaScript to construct our visualizations in a more programmatic way. Although JavaScript comes with a lot of potential, we have also seen that it can create quite a bit of mental overhead when using it to create our visualization! One of the main drawbacks of the approach we have used so far is that we had to deal with different 'domains' or 'registers' in which our visualization is created. In its simplest form, the Document Object Model (DOM) is written down in HTML (Week 1 & 2) but once we add in JavaScript, the DOM can be expressed and manipulated from both HTML and JS! As we have seen, with JavaScript we have to 'reach' into the existing DOM, extract some elements, manipulate them and then, ultimately, put the results back. Meanwhile, we have to keep a mental picture of the DOM in our head because unlike HTML, JS doesn't really tell us how the DOM might look like at that point in time. That's a lot to keep track off – especially once we graduate from our relatively simple, static charts.

Luckily, modern (i.e. 2010 onwards) JavaScript approaches provide alternative ways to do this that are more amenable to both the development of visualizations as well as larger, interactive web applications. We will be using [Svelte](http://svelte.dev/), a framework that allows for both *declarative* as well as *reactive* programming. It uses a similar approach as other frameworks such as Angular, React, and Vue (in case you're familiar with any of those names!).

The approach we used in the previous block with 'vanilla' JavasScript is called *imperative*: we tell the computer exactly what to do at each step and it will execute as such, with every step run in the order it appears. In the declarative approach, instead, we tell the computer what the end result should look like and the computer will figure out how to get there. The reactive aspect means that if any parts of our application changes or updates (for example, the input data changes; or the user clicks on something), the rest of the application will react and update accordingly. Sounds nice, doesn't it? There's a bit of a catch: we need to learn a bit more about the particulars of the Svelte framework.

## Anatomy of a Svelte app
Svelte uses a 'single-file component' approach to making web applications. This means that JavaScript `<script>`, CSS `<style>` and HTML/SVG elements (the 'markup') can all be combined into a single file with the `.svelte` extension. This is very similar to a regular HTML file but, as we will soon see, Svelte components are kind of like a super-charged version of HTML.

In the sandbox below, you can see a simple Svelte application that contains the starting block of our familiar bar chart. There are some additional files placed in the sandbox, but we will focus on the `App.svelte` file for now. It contains all the necessary parts of our visualization.

We can recognize a series of JS variable bindings (everything between the `<script>` tags at the top), a series of CSS declarations (everything between the `<style>` tags at the bottom), and finally the 'meat' of our visualization as HTML elements in between. Note that we no longer have to specify a complete HTML document with `<head>` and `<body>` tags and the like. Svelte allows us to hone in on what matters most to us – our actual content and visualization.

::: codesandbox sandboxes/week5_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

## Template Syntax: Curly Braces
If you inspect the code in the sandbox above closely, you soon realize that it doesn't actually 'do' anything with the JS variables. The attributes of the `<text>` and `<rect>` are written directly in plain, static HTML and the JS variables are unused. In the previous weeks, when we wanted to adapt the attributes of those elements from within JS, we needed to use a series of convoluted steps that select, manipulate and insert DOM elements. Svelte allows us to 'bridge' HTML and JavaScript in a much easier way using something that's called a 'template' syntax.

The first template syntax we will use are the curly braces `{ }`. Anything we type in the HTML markup of our component between curly braces, will be evaluated as JavaScript and replaced with the outcome of that evaluation. Like so:
```svelte
<h1>{ 1 + 1 }<h1>
<!-- becomes -->
<!-- <h1>2<h1> -->
```

You can use it to 'print' the values of variables as well:
```svelte
<text>{ populationLabel }</text>
<!-- becomes -->
<!-- <text>220,000</text> -->
```

Note that you can use the curly braces for both the content of HTML elements (like in the example above), as well as their attributes.
```svelte
<text x={populationXPosition} y={yPosition}>{ populationLabel }</text>
<!-- becomes -->
<!-- <text x=153 y=15>220,000</text> -->
```
Let's put this in practice by replacing the 'static' values in our sandbox code with a reference to the JS variables instead.

::: div callout
We will do this section in class together.
:::

::: solution show
::: codesandbox sandboxes/week5_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::

## Template Syntax: Each Blocks
We now know how to make good use of the curly braces to 'insert' the outcome of JS code into the HTML/DOM of our document. However, we've only drawn a single bar element so far. To be able to draw multiple bar elements (one for each item in our dataset), we need some kind of logic that's similar to JavaScript's `for` loop.

In Svelte, apart from the 'regular' curly brace syntax we've seen above, we also have some special curly brace 'blocks' that allow us to implement conditional and looping structures (see [EJ Chapter 2](https://eloquentjavascript.net/02_program_structure.html) for a refresher on how that works in normal JS). In this week, we will use the [each block](https://svelte.dev/docs#each).

In essence, an each block allows us to loop over a JS array and create whatever HTML elements we like within each iteration. An each block is opened with `{#each expression as name}` and closed with `{/each}`. So, this:
```svelte
<script>
  let items = ['sprite', 'coke', 'milo']
</script>

{#each items as item}
  <p>{item}</p>
{/each}
```
Will create the following HTML:
```html
<p>sprite</p>
<p>coke</p>
<p>milo</p>
```
You can try this out for yourself on the Svelte's neat website – it contains [a simple sandbox utility where I've copied the above example](https://svelte.dev/repl/9ac0ce053c144b6f94ce716e4b800fd8?version=3.19.1). Try to add another drink to the `items` array to get a sense of what happens to the rendered HTML on the right. Or adjust the inside of the `{#each}...{/each}` block to include an extra `<p>` element for each drink.

Our objective is to use the `each` block to loop through each element in our dataset (tip: copy over the `let data` statement from our previous week) and create the appropriate `<g>`, `<text>` and `<rect>` elements in each iteration.

::: div callout
We will do this section in class together.
:::

::: solution
We are using `{#each data as item, i}` to loop over all 'rows' in the `data` variable. Within the loop, we will have access to a `item` variable that contains the corresponding object for that element or 'row' of our `data`, as well as a `i` or index variable that is simply the current index of the iteration. This is an optional, second argument for Svelte's each blocks (reminder, check out [the docs](https://svelte.dev/docs#each) to read more about potential functionality of each new technique we use). In this case it comes in handy because we want to use the index to calculate the correct `y` position of each element!

Instead of typing `y={yMarginTop + i * yMarginBottom}` for each element, we use a convenience function `yPos` (see line 91 for each declaration) so we can simply type  `y={yPos(i)}`.

::: codesandbox sandboxes/week5_stage_final codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

:::
