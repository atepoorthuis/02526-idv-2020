# Week 3: Javascript Fundamentals I

## Introduction
After the first two weeks, we now know how to create the *structure* (HTML) and the *styling* (CSS) of web-based charts. However, so far we have created these charts completely by hand – artisanal data visualization! This can be powerful in its own right and even quite enjoyable. But in many cases, we would like to create visualizations in a more programmatic fashion. After all, we are working on a computer: we should try and use the capabilities that a computers affords us to a greater extent. On the web, we can do so by using the JavaScript (JS) programming language – the third, and final, language we need to know about to create web content. If HTML provides the structure of the web and CSS the styling, JS allows us to programmatically interact with and build web pages.

## Document Object Model
Before we discuss JavaScript in more detail, we need to introduce another new, odd-sounding, concept: the Document Object Model (DOM). The DOM is a logical way to represent the structure of a web page so it can be created, altered and displayed using a computer. In other words, to show our Du Bois visualization on the screen the browser will take the structure that we initially expressed in the HTML document and convert it to a DOM. The DOM is a tree structure where each HTML element becomes a node, and each node can have additional nodes as children.

![](images/1920px-DOM-model.svg.png)

As a normal consumer of web pages, you can be completely oblivious to the existence of these DOMs but your browser will create one for each page you visit. As a developer, we can take a look 'under the hood' and make the DOM visible.

To do that, let's have a look at the below sandbox. 'Open' the sandbox so we view it on CodeSandbox.io rather than embedded in the current website and open the rendered page in a new window.

![](images/open_in_new_window.png)

::: codesandbox sandboxes/week3_dom_sandbox codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

Once you have the page open in its own window, right-click on the 'big title' and select `Inspect Element`. This will open up the developer tools of the browser and will navigate to the node, within the DOM, that contains the title. The developer tools also show the rest of the DOM tree – note that when you hover over a specific node, the browser will highlight on the page where that node is rendered. This will help build a mental picture of the correspondence between the DOM and what is shown on the page.

![](images/devtools.png)

## Manipulating the DOM
As the browser needs to create this DOM tree structure to actually display our web page, this also opens up the ability for us to adjust the DOM structure ourselves. We can create, change or remove nodes in the DOM tree as we see fit. This functionality is at the core of 'programmatic' visualizations: we will write a series of instructions that will dynamically build up the DOM tree for our visualization, rather than writing everything out by hand in HTML. The only language that we can use to do this happens to be JavaScript. It is the one programming language that all browsers know how to process.

Before we see how this applies to our Du Bois visualization, we will dip our toes in the water and manipulate the DOM in our toy example. To do so, open the `Console` tab of the Developer Tools. The Console is an interactive interpreter for JavaScript code – similar to the console in RStudio. Anything you type in here, will be evaluated by the browser and, where appropriate, applied to the current page.

![](images/console.png)

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


