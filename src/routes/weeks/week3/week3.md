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
Just as we could include CSS in our HTML document, we can also include JS code within the same document. We do so by writing JS code in a `<script>` element ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)). We can include the `<script>` element either within the `<head>` or `<body>` of the document. For now, we will always include our JS in the body of the document, just before the end of the body element.

```html
<body>
    <!-- other HTML/SVG elements in your document go here -->
    <script>
        // js code goes here
    </script>
<body>
```

Just like we have seen earlier with CSS, we can also refer to an external JS file. This can be hosted on a different server (such as Google's fonts) or within our own project folder. This can be quite handy to keep things organized and separated. We will adopt this practice here as well, and create a separate file called `index.js`. We can include and execute any code contained in this file by referring to it from our HTML file like so:

```html
<body>
    <!-- other HTML/SVG elements in your document go here -->
    <script src="index.js"></script>
<body>
```

## Rebuilding Our Du Bois Chart with JS
In the next section, we will build our original Du Bois bar chart again, but now with JS instead of writing each element directly into the HTML document. In doing so, we will walk through the most important aspects of JavaScript as well. This highlights the essential concepts, which are covered in much more detail in the [Eloquent Javascript](https://eloquentjavascript.net/) (ES) textbook.

To provide a starting point, we will use the below sandbox. It contains the skeleton of our graph, with a single, commented-out bar element. In the next sections, we will first recreate the single bar element with JavaScript and then scale up to recreating all bar elements.

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

To do that, we will first start organizing the key 'ingredients' and store them in [JavaScript variables](https://eloquentjavascript.net/02_program_structure.html#h_lnOC+GBEtu) so we can more easily use and re-use them. The most important to note about creating variables in JS is that they are created by using the `let` keyword, followed by the variable name, then an equal `=` sign, and finally the value you'd like to assign or bind to that variable name.

```js
let variableName = 'value'
```

To apply this to the task add hand, add the following to your `index.js` file.

```js
// label variables
let yearLabel = '1750' // single quotes indicate these are 'string' values
let separatorLabel = '–'
let populationLabel = '220,000'
```

With this code, you create three variables but you don't see any results on the screen! To help us understand the 'content' of a variable, we can [log it to the console](https://eloquentjavascript.net/01_values.html#p_edv0ySDJvj) with `console.log()`.

```js
console.log(populationLabel) // check out the console 
```

You can find the console in your developer tools or, if using CodeSandBox, in the bottom-right corner:

![console in csb](images/console-log.png)

Let's finish collecting all the essential bits of data into variables.

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
Note that we use the `let` keyword here but could also have used `const` for these values as they are constant and will not change. You can read more about the difference in [ES Chapter 2](https://eloquentjavascript.net/02_program_structure.html#p_ReUkO4pLEi). For simplicity, we use `let` exclusively here.

::: codesandbox sandboxes/week3_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::

### Updating the DOM
 

### loop