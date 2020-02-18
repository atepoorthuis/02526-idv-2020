---
solution: false
---
# Week 3: Javascript Fundamentals I

## Introduction
After the first two weeks, we now know how to create the *structure* (HTML) and the *styling* (CSS) of web-based charts. However, so far we have created these charts completely by hand – artisanal data visualization! This can be powerful in its own right and even quite enjoyable. But in many cases, we would like to create visualizations in a more programmatic fashion. After all, we are working on a computer: we should try and use the capabilities that a computer affords us to a greater extent. On the web, we can do so by using the JavaScript (JS) programming language – the third, and final, language we need to know to create web content. If HTML provides the structure of the web and CSS the styling, JS allows us to *programmatically* interact with and build web pages.

## Document Object Model
Before we discuss JavaScript in more detail, we need to introduce another new, odd-sounding, concept: the Document Object Model (DOM). The DOM is a logical way to represent the structure of a web page so it can be created, altered and displayed using a computer. In other words, to show our Du Bois visualization on the screen the browser will take the structure that we initially expressed in the HTML document and convert it to a DOM. The DOM is a tree structure where each HTML element becomes a node, and each node can have additional nodes as children.

![dom model](images/1920px-DOM-model.svg.png)

As a normal consumer of web pages, you can be completely oblivious to the existence of these DOMs but your browser will create one for each page you visit. As a developer, we can take a look 'under the hood' and make the DOM visible.

To do that, let's have a look at the below sandbox. 'Open' the sandbox so we view it on CodeSandbox.io rather than embedded in the current website and open the rendered page in a new window.

![open sandbox in new window](images/open_in_new_window.png)

::: codesandbox sandboxes/week3_dom_sandbox codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

Once you have the page open in its own window, right-click on the 'big title' and select `Inspect Element`. This will open up the developer tools of the browser and will navigate to the node, within the DOM, that contains the title. The developer tools also show the rest of the DOM tree – note that when you hover over a specific node, the browser will highlight on the page where that node is rendered. This will help build a mental picture of the correspondence between the DOM and what is shown on the page.

![devtools](images/devtools.png)

## Manipulating the DOM
As the browser needs to create this DOM tree structure to actually display our web page, this also opens up the ability for us to adjust the DOM structure ourselves. We can create, change or remove nodes in the DOM tree as we see fit. This functionality is at the core of 'programmatic' visualizations: we will write a series of instructions that will dynamically build up the DOM tree for our visualization, rather than writing everything out by hand in HTML. The only language that we can use to do this happens to be JavaScript. It is the one programming language that all browsers know how to process.

Before we see how this applies to our Du Bois visualization, we will dip our toes in the water and manipulate the DOM in our toy example. To do so, open the `Console` tab of the Developer Tools. The Console is an interactive interpreter for JavaScript code – similar to the console in RStudio. Anything you type in here, will be evaluated by the browser and, where appropriate, applied to the current page.

![console](images/console.png)

For example, type `1 + 3` in the console and hit enter to see what happens.

We will use the console to try and add a `<h2>` element to the page, as if we had typed the following code in HTML

```html
<body>
<div class="container">
    <h1>
    A big title, in a container
    </h1>
</div>
<h2>This is a second header</h2>
</body>
```

To do this from the console, we will make use of the following JavaScript functions:

- `document.createElement()` to create a new `h2` node - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- `element.innerHTML()` to set the content/text of the header - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- `document.body.appendChild()` to add the newly created node to the DOM tree in the right location (as the last child of the body) - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

Don't worry yet if you are unsure what these functions mean or how they work. We will work through the JavaScript fundamentals step-by-step in creating our Du Bois chart. For now, we are just getting a small taste of what JavaScript can do for us.

::: div callout
We will do this section in class together.

Make sure you review Eloquent Javascript Chapter 1-3 to understand how JavaScript implements basic programming building blocks (variables, values and functions) for next week!
:::

::: solution show
Instead of executing the JavaScript function in the console, we can also include js code between in a `<script>` element.

::: codesandbox sandboxes/week3_dom_sandbox_solution codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::

## Including JS in your HTML documents
Just as we could include CSS in our HTML document, we can also include JS code within our document. We do so by writing JS code in a `<script>` element ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)). We can include the `<script>` element either within the `<head>` or `<body>` of the document. For now, we will always include our JS in the body of the document, just before the end of the body element.

```html
<body>
    <!-- other HTML/SVG elements in your document go here -->
    <script>
        // js code goes here
    </script>
<body>
```

Just like we have seen earlier with CSS, we can also refer to an external file that contains our JavaScript instructions. Such a file can be hosted on a different server (such as we saw with Google's fonts) or within our own project folder. This can be quite handy to keep things organized and separated. We will adopt this practice here as well, and create a separate file called `index.js`. We can include and execute any code contained in this file by referring to it from our HTML file like so:

```html
<body>
    <!-- other HTML/SVG elements in your document go here -->
    <script src="index.js"></script>
<body>
```

## Rebuilding Our Du Bois Chart with JS
In the next section, we will build our original Du Bois bar chart again, but now 'programmatically' with JS instead of writing each element directly into the HTML document. In doing so, we will use and apply important aspects of JavaScript as well. This will serve to highlight the most essential JS concepts, which are covered in much more detail in the [Eloquent Javascript](https://eloquentjavascript.net/) (ES) textbook.

To provide a starting point, we will use the below sandbox. It contains the skeleton of our graph, with a single, commented-out bar element. In the next sections, we will first recreate this single bar element with JavaScript and then scale up to recreating all bar elements.

::: codesandbox sandboxes/week3_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::


### Values & Variables
As stated, our first task is to recreate the following SVG bar element group with JavaScript instead.

```html
 <!-- 1750 bar -->
<g>
    <text x="22.5" y="15" dominant-baseline="hanging">1750</text>
    <text x="70" y="15" dominant-baseline="hanging">–</text>
    <text x="153" y="15" dominant-baseline="hanging" text-anchor="end">
        220,000
    </text>
    <rect x="165" y="15" height="11" width="17" />
</g>
```

To do that, we will start organizing the key 'ingredients' and store them in [JavaScript variables](https://eloquentjavascript.net/02_program_structure.html#h_lnOC+GBEtu) so we can more easily use and re-use them. The most important to note about creating variables in JS is that they are created by using the `let` keyword, followed by the variable name, then an equal `=` sign, and finally the value you'd like to assign or bind to that variable name.

```js
let variableName = 'value'
```

To apply this to the task at hand, add the following to your `index.js` file.

```js
// label variables
let yearLabel = '1750' // single quotes indicate these are 'string' values
let separatorLabel = '–'
let populationLabel = '220,000'
```

With this code, you create three variables but you don't see any results on the screen! To help us understand the 'content' of a variable, we can also [log it to the console](https://eloquentjavascript.net/02_program_structure.html#h_6+Vb3XQoaa) with `console.log()`.

```js
console.log(populationLabel) // check out the console 
```

You can find the console in your developer tools or, if using CodeSandBox, in the bottom-right corner:

![console in csb](images/console-log.png)

Let's finish this process by collecting all the essential bits of data into individual variables.

```js
// label position variables
let yPosition = 15 // numeric variable
let yearXPosition // assign the right values to all these variables
let separatorXPosition
let populationXPosition

// bar variables
let barXPosition
let barHeight
let barWidth
```

::: div callout
We will do this section in class together.
:::

::: solution
Note that we use the `let` keyword here but could also have used `const` for these values as they are constant and will not change. You can read more about the difference in [EJ Chapter 2](https://eloquentjavascript.net/02_program_structure.html#p_ReUkO4pLEi). For simplicity, we use `let` exclusively here.

::: codesandbox sandboxes/week3_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::

### Manipulating the DOM
We have now collected all the essential ingredients for our bar element in variables. This makes us ready for the next step: actually drawing the bar element on the page. To achieve this we need to walk through a few key steps:

1. Select the SVG element that already exists within the DOM.
2. Create a new `<g>` element.
3. Create three new `<text>` elements with the right properties, and add them as children to the `<g>` element.
4. Create a single `<rect>` element with the right properties, and add them as another child to the `<g>` element.
5. Add the `<g>` element to the SVG element.

To do this, we will make use of a set of JS functions that help to manipulate the DOM. These are built-in functions available in any web document. As you can read in [EJ Chapter 2](https://eloquentjavascript.net/02_program_structure.html#h_K5Yd6h3Axg), functions are – in essence – a collection of instructions that perform a specific task. For now, we will gain some practice executing pre-existing functions but next week we will also write our own functions. To execute a function in JavaScript, we write its name, followed by parentheses. Within the parentheses, we can add values, or arguments, that will be given to the function and might be used for executing its task. You can see this at work when logging to the console.

```js
// function('some value')
console.log('some value') // the console.log function will print 'some value' to the console
```

For now we will use the following functions:

- `document.getElementById()` - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- `document.createElementNS()` - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS)
- `element.setAttribute()` - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- `element.appendChild()` - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

We start by selecting our already existing `<svg>` element from within the DOM. This allows us to subsequently append additional SVG elements as children of that SVG in the DOM tree. To make this a bit easier, I've added an `id` attribute to the SVG in the HTML code (check out `index.html`). These attributes [work the same way](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) as the `class` attribute with the difference that a specific `id` value can only be assigned to a single element (whereas the same class value can be assigned to many elements). We can use this `id` value (in this case, it is `chart`) to select our SVG from the DOM.

```js
let svg = document.getElementById('chart')
```
::: div callout
Note that you can always inspect the value of any variable by logging it to the console. Add `console.log(svg)` to try it out.
:::

Our next step is to create a new `<g>` element. Because SVG elements are somewhat special, we cannot use the normal `document.createElement` function that we used in the previous section to create a `<h2>` element. Rather we need to use `document.createElementNS` so that we can instruct the browser this is going to be a SVG element.

```js
// the w3.org bit indicates that this will be a SVG element
let itemGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
```

We can use the same function to create our first text element and subsequently set its attributes.

```js
// first text element
let yearElement = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'text'
)
yearElement.setAttribute('x', yearXPosition) // x position
yearElement.setAttribute('y', yPosition) // y position
yearElement.setAttribute('dominant-baseline', 'hanging')
yearElement.textContent = yearLabel // the actual content of the text element
itemGroup.appendChild(yearElement) // append <text> element as child to <g> element
```

If you add the above code to your `index.js` file, you still do not see the actual text displayed on the page. How could that be? This is because the `itemGroup` node, which now holds our `<text>` label, has been created but it has not been added to the DOM. In other words, we first need to add the `itemGroup` to the SVG element.

```js
svg.appendChild(itemGroup)
```

There it is!

![console in csb](images/yearelement.png)

Now, repeat the logic we have used so far to add in the remaining two text elements as well as the rectangle element for the actual bar.

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week3_stage_3 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::

### Iteratively creating SVG elements – JS Loops
As you have now noticed, it is (almost) as much work to create the SVG elements in JS as it is to write the HTML yourself. Fret not – the real power of JS reveals itself once you apply the same JS code to create all the other items in the graph. To do this, we need a way to capture our entire dataset in a way that JS can understand (revisit [EJ Chapter 4](https://eloquentjavascript.net/04_data.html)).

I have included the data below in tabular csv format. Can you think of the right way to represent this same data within JS?

```markdown
year,population,population_pixels
1750,220000,17
1760,310000,26
1770,462000,38
1780,562000,59
1790,757208,80
1800,1002037,106
1810,1377808,132
1820,1771656,162
1830,2328642,194
1840,2873648,223
1850,3638808,255
1860,4441830,278
1870,4880009,311
1880,6580793,359
1890,7470040,407
```

For small datasets like this, it is often efficient to convert your data directly to a JavaScript object, or JSON, yourself. Sometimes the software you are working in can do this for you (e.g. Python and R can both write objects to JSON) but you can also use a web service like [csvjson.com](https://www.csvjson.com/csv2json) to do the same in a pinch.

Try converting the tabular data into JSON using the `csvjson.com` web service. Once you have converted the data, include it in your js like so:

```js
let data = [
    {
    "year": 1750,
    "population": 220000,
    "population_pixels": 17
    },
    /// snip ///
    {
    "year": 1890,
    "population": 7470040,
    "population_pixels": 407
    }
]
```

With our data in place, we can create a chart element *for every item* in our dataset. We will have to implement the following additional two steps:

1. Adapt our existing variables to calculate the y position of each element. The x position, thankfully, stays the same for every element. Previously, our y position was fixed at `15`. Now we need to recalculate the y position for each element with an appropriate offset. In other words, we need to encode into two variables both a starting position, as well as a specific 'margin' between elements.
2. Use a `for()` [loop](https://eloquentjavascript.net/02_program_structure.html#h_oupMC+5FKN) to iterate over each item in our data array. You can create such a loop like so:

```js
for (let index = 0; index < data.length; index++) {
    // this will execute a loop that starts at 0
    // the index variable will increment by 1 for each iteration of the loop
    // this will keep iterating until the index variable is longer smaller than the total number of items in the data variable
    // in other words, the 'end' of the dataset has been reached
}
```

We can use the loop to create a `g` element and all the necessary child elements within, and then append this group element to the `svg` parent. The loop will help do this for each item in our dataset. You will have to adapt the code for the single bar element we created in the previous section to now create one element in each iteration of the loop. You can use the below snippet as a starting point. Remember that you can use logging to the console to better understand what values are present in a variable on each iteration of the loop.

```js
for (let index = 0; index < data.length; index++) {
  let item = data[index]
  console.log(item)
  let yPosition = yMarginTop + (index * yMarginBottom) // make sure you define yMarginTop and yMarginBottom previously in your code
  console.log(yPosition)
}
```

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week3_stage_4 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::