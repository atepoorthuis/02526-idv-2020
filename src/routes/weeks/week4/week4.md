---
solution: true
---
# Week 4: Javascript Fundamentals II

## Introduction
In the previous week, we have covered all the essential JavaScript concepts needed to recreate our original Du Bois chart. In this week, we will add two additional concepts that will help make working with JS easier, and more fun! First, we are going to create our own functions to help us structure our code a bit better. Second, we will get acquainted with 'events', which provide the way for us to add interactive elements to web pages. Finally, in the latter half of this week, we will switch from our familiar CodeSandbox playground to a full-fledged development environment installed locally on your own computer.

## Refactoring code with functions
So far, you have *used* functions but you have not yet created your own functions. Just as creating your own variables helps you structure your code (e.g. by giving semantic names), creating your own functions helps with this too. In addition, they also can help simplify procedures you need to execute often.

In the case of last week's chart, we created three separate text elements within each iteration of our loop:
```js
for (let index = 0; index < data.length; index++) {
  let item = data[index]
  let yPosition = yMarginTop + (index * yMarginBottom)

  // create a '<g>' element to hold children
  let itemGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')

  // first text element
  let yearElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  )
  yearElement.setAttribute('x', yearXPosition)
  yearElement.setAttribute('y', yPosition)
  yearElement.setAttribute('dominant-baseline', 'hanging')
  yearElement.textContent = item.year
  itemGroup.appendChild(yearElement)

  // second text element
  let separatorElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  )
  separatorElement.setAttribute('x', separatorXPosition)
  separatorElement.setAttribute('y', yPosition)
  separatorElement.setAttribute('dominant-baseline', 'hanging')
  separatorElement.textContent = separatorLabel
  itemGroup.appendChild(separatorElement)

  // third text element
  let populationElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  )
  populationElement.setAttribute('x', populationXPosition)
  populationElement.setAttribute('y', yPosition)
  populationElement.setAttribute('dominant-baseline', 'hanging')
  populationElement.setAttribute('text-anchor', 'end')
  populationElement.textContent = item.population
  itemGroup.appendChild(populationElement)

  // create bar element here

  svg.appendChild(itemGroup)
}
```
Doing so line-by-line creates a lot of extra code – that's quite the wall of text! This doesn't help the readability of our code at all. What's more, we can't really tell what each block of code is actually trying to achieve without walking through it in detail. We will address this by *refactoring* our code to create and use a function that will create a text element with all of the right properties in a single go. Refactoring is just a fancy way of saying restructuring a piece of code (often to increase legibility, or speed) without altering its ultimate effect. And that's exactly what we want to do to! We don't want to change the appearance of the graphic - just simplify the code that generates it. 

We will start by creating an entirely new function of our own. Please review [EJ Chapter 3](https://eloquentjavascript.net/03_functions.html) for the details on how to declare and execute functions. You can take the following function as a starting point.

```js
function createTextElement(argument1, argument2) {
  // do something with these arguments
  // then return the resulting text element
}
```

When declaring our functions we need to walk through the following steps:

1. Give our function an appropriate name.
2. Think about which arguments or parameters the function needs as input.
3. Process the arguments and apply any other needed logic
4. Return the correct output value
5. Call the function with the necessary parameters/values in the right location in your script

You can use your own sandbox or last week's sandbox (below) as a starting point.

::: codesandbox sandboxes/week3_stage_4 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week4_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::

## JavaScript Events
As we learn from [Eloquent Javascript Chapter 15](https://eloquentjavascript.net/15_event.html), Javascript allows us to respond to different kinds of user input through 'event handlers'. This is very useful for interactive data visualization. After all, we would ultimately like to enable users to *interact* with our visualization, especially because this often very helpful in achieving various *tasks* (cf. VAD Chapter 3).

We can 'bind' event handlers to specific DOM elements, for specific events. When we define such an event handler or listener, we can also specify what specific function we would like to execute when an event is registered or 'fired'. To do this, we will make heavy use of the `addEventListener` function ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)), which is built into JS in the browser. This function takes two arguments: the name of the specific event it should listen for, and the function it executes when the event is fired. For example, to listen to a 'click' on our bar chart rectangle, we can do the following:

```js
let barElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
barElement.addEventListener("click", function () {
    console.log("My rectangle has been clicked");
})
```

Within our for-loop, let's try to add this `click` event to each rectangle of our bar chart. Upon click, `console.log` the 'population' variable for the corresponding rectangle to the console.

As we can read in EJ Chapter 15, there are many more events available in addition to our simple click. We can react to key presses, touch events, and other mouse events. We will experiment a bit more with event listeners by trying to make the bars *change color* when the user hovers over the bar. Some things to keep in mind:

- You will need to change the color from within the function that is called by the eventListener. Seeing as we set the default colour of each rectangle in our CSS previously, what do you think is the best way to do this?
- You'll soon realize you need to make use of **two** separate event listeners for each element. Use MDN's [Event documentation](https://developer.mozilla.org/en-US/docs/Web/Events#Mouse_events) to find out what the second event listener would be.

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week4_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light
:::

:::

**Extra exercise**
Replace the original caption text with a static text that says `Hover over each rectangle to find out more...`. Then implement a function that gets executed upon hovering over the bar elements and changes the caption to the following text:

```
In [year] there were [population in year] African-Americans in the United States of America.
This constitutes a [% increase compared with previous decade]% compared with the population 10 years earlier;
and a [% increase compared with 1750]% increase compared with the population of African-Americans in 1750.
```

Note you will need to use string *concatenation* to construct this text – refer back to [EJ Chapter 1](https://eloquentjavascript.net/01_values.html#p_+y5+JTiKgR) for a refresher. When the mouse leaves the rectangle, make sure the text gets replaced with the default text again.

## Setting up your own development environment [for Thursday]
So far we have used the online platform CodeSandbox to create our HTML, CSS and JS documents. This is useful if we're just getting started but for larger projects it is often more convenient to rely on a web development environment that is set up on your local machine. To do this effectively, we need to install a few things, in this order:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

If you are on Mac, I highly recommend you install Node and Git through [Homebrew](https://brew.sh/). If you are on Windows, unless you know exactly what you're doing, just follow the direction on each site. If you already have a preferred code editor, you can feel free to use that instead of VS Code.

## Setting up Javascript project
To further set up your local development environment, we will need to walk through the following steps (we will talk through these steps in detail in class):

- Clone your existing (empty) Github repository to a directory on your computer.
- Open the project directory in Visual Studio Code
- Edit the README.md document by adding your name to the title or a similar small change.
- Use VS Code's built-in git functionality to stage, commit and push this change to Github. You can double-check by going to the url of your repo on Github. Your change should show up here!
- Download the CodeSandbox you created for Block 1 and add the files to the assignments/block1 directory so that your index.html file lives at assignments/block1/index.html
- Open a Terminal from within VS Code
- Install the necessary dependencies by running `npm install`
- Run a local development server by running `npm start`
- Once everything works OK, stage our changes, commit and push the change to Github again.

## Recap
By the end of this week, you should be able to understand and apply in practice the following concepts:
- How to declare your own JS functions and use them to refactor your code.
- Understand the concept of event handlers, and apply them using the `addEventListener` function to allow for simple user interactions within a graph.
- Understand the objective of `git`, its relation to github.com, and the git core concepts: `clone`, `stage`, `commit`, `push` and `pull`.
- Use VS code to edit the source code of a project, and use its built-in git integration to save to changes to version control.
- Use of `npm` to install dependencies and run a local development server with hot-reload.