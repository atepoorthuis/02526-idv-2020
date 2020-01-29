# Week 1: HTML / SVG ('Drawing')

## Introduction
In this first week, we will get familiar with HTML, and its extension SVG. HTML is responsible for drawing creating the structure of every webpage online – including the page you're reading right now. To learn in a practical manner, we will put the things we learn directly into practice. We will do this by replicating a series of visualizations from Du Bois' exhibit on African-American life at the turn of the nineteenth century. You can read more about this curious series in the recent book [Visualizing Black America](https://www.amazon.com/W-Boiss-Data-Portraits-Visualizing/dp/1616897066) or check out this six (!) part series at [Towards Data Science](https://towardsdatascience.com/w-e-b-du-bois-staggering-data-visualizations-are-as-powerful-today-as-they-were-in-1900-64752c472ae4). You can find all visualizations from the exhibit over at the [Library of Congress](http://www.loc.gov/pictures/search/?q=drawing&co=anedub&st=gallery).

To keep things simple, I have selected a relatively straightforward bar chart for this first week.

![DuBois Plate 39](/images/_DuBois_Plate_39.png)

## HTML
Before starting on the next section, I highly recommend you work through the first section of [Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML). Don't worry if you don't understand everything yet – that's completely fine as we'll review the most important aspects together in this exercise. In most practical circumstances, we do not create HTML completely from scratch (*phew!*). Instead we will use a boilerplate template to get us started a bit more quickly. I have provided one for you below. The whole HTML document is quite short. Every HTML document always starts with an `<html>` opening tag – and closes on the very last line with an `</html>` closing tag. You can always recognize closing tags by the forward slash `/`. Keep a mental note that every element we create in HTML always needs to be opened AND closed. The `<head>` of our document contains some document metadata (like the title that you see at the top of your browser window) but it doesn't affect the way the page is drawn so we'll ignore it for now. `<body>` is where the magic happens. Anything included here will actually be rendered and drawn on the page by your browser. For 99.9% of your time you'll be working within the `<body>`.

Right now, the `<body>` only contains a single element to get us started. The `<h1>` tag creates a header of the highest (1) level.

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Plate 39</title>
  </head>

  <body>
      <h1>Increase of the Negro population in the United States of America.</h1>
  </body>
</html>
```

We can look at an interactive version of our HTML document in the _CodeSandBox_ below. Obviously, we are still quite a few steps removed from reproducing our graph. Let's get started by inserting a few of the non-graphical elements. We already have one title, but there's a few other (sub) titles, as well as a caption below the chart. Let's create these by using the following elements:

- `h2`
- `h3`
- `p`
- `div`

::: codesandbox sandboxes/week1_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1
:::

```md
We will do this section in class together (you can do it right there in the CodeSandbox!) – we will fill in this empty space with our solution and a run-through of how each element is (to be) used afterwards.
```

## SVG
To start drawing the graphical parts of the chart, we will have to make an excursion from HTML to SVG. SVG is almost like HTML but it is specifically designed to create graphics. It's very versatile and not constrained to just browsers. If you're familiar with drawing/vector programs like Adobe Illustrator, they can all create, read and export SVG files. Before we continue, do take note of the first section of  the MDN [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial).

We will create an SVG canvas to hold our chart of 500 by 500 pixels. Add this `svg` element to your CodeSandBox in the right location. Once it is placed, you should see the page update and show an empty placeholder where we will now build our graph. 

```html
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <!-- svg content goes here -->
</svg>
```

Let's start by drawing the first 'entry' in the bar chart. To do so we only need to make use of two types of SVG elements:
- `text` (for the year, dash, and population labels)
- `rect` (for the actual bar)

```md
We will do this section in class together (you can do it right there in the CodeSandbox!) – we will fill in this empty space with our solution and a run-through of how each element is (to be) used afterwards.
```

Once you have created the first entry/bar, it is a matter of rinse & repeat to draw all the other bars. Let's add them all! To organize each entry in a logical unit, we can use the `g` or group element. Like so:

```html
<g>
    <!-- a bar -->
    <text>First Text Element</text>
    <text>Second Text Element</text>
    <text>Third Text Element</text>
    <rect />
</g>
```

```md
We will do this section in class together (you can do it right there in the CodeSandbox!) – we will fill in this empty space with our solution and a run-through of how each element is (to be) used afterwards.
```

Ultimately, our graph will look some thing like this.

![repro](/images/_repro.png)

As we expect, this is not a complete reproduction of the Du Bois graph but it has all the structural elements that it needs. In other words, everything that needs to be drawn, is drawn – just not with exactly the right styling. Styling is a task for CSS, which we will cover in the next week.

If you have time left and want to work ahead, as part of this first block's assignment, you will not only reproduce this particular graph but also choose another graph to reproduce completely by yourself. Browse through the available choices at the [Library of Congress](http://www.loc.gov/pictures/search/?q=drawing&co=anedub&st=gallery) – you can choose your own challenge-level (e.g. those curved bar charts require some extra thinking..), but for now stay away from the map-based figures. We will pick up the thread on styling/CSS next week but you already now enough to reproduce the structure of your graph with HTML.