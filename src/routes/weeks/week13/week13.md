---
solution: false
---
# Week 12: Project Studio

## Introduction
As you are working on your final projects, below is just a list of topics or issues that came up and might benefit more than a single project group.

## How to implement drag & drop?
In principle, drag and drop in modern browsers can be implemented using the native HTML Drag and Drop API ([see MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) as per usual). This involves defining which elements are 'draggable', what data should be copied on drag (often some text or html element), and ultimately where a dragged element can be 'dropped'.

Svelte makes setting up all this logic a little bit more convenient, see for example this [Drag and Drop REPL](https://svelte.dev/repl/adf5a97b91164c239cc1e6d0c76c2abe?version=3.14.1) and [this REPL that includes transition effects](https://svelte.dev/repl/7c9964de18604b2582ddd844cebdf218?version=3.15.0). However, especially for more advanced drag & drop, wiring up all of this logic can be somewhat cumbersome. To make this easier, as you can imagine, there are a ton of libraries that help you set up drag and drop. Within the Svelte universe, there's a few noteworthy ones: [svelte-grid](https://svelte-grid.now.sh/), which allows you to create a draggable and resizable grid layout (handy for dashboards); and [Moveable](https://daybrush.com/moveable/) ([svelte-specific version](https://github.com/daybrush/moveable/tree/master/packages/svelte-moveable)) which allows you to drag, resize, rotate and even warp target elements. 

In the specific context of visualizations, `florence` also provides `onMousedrag` and `onTouchdrag` listeners that make it easier to set up dragging _within_ your visualization. The [interactivity documentation](https://florence-docs.netlify.app/docs/concepts/interactivity) gives a nice example of how to set this up – I'll walk through its main logic in the short video below.

::: div callout
<iframe title="IDV Week 13 Drag & Drop" width="560" height="315" src="https://www.youtube-nocookie.com/embed/lAVqAiNoQSw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

## How to include a basemap layer in my spatial visualization?
So far, we have created series of thematic maps by drawing all elements of the map ourselves. We have drawn the outlines of Singapore and its planning areas by loading in the correct GeoJSON and expressing the data within as visual polygons on the screen. However, in some cases it can be very useful to include an additional 'basemap' that allows the user to orient themselves by also displaying some key geographic features such as rivers, streets etc. Instead of drawing this completely by hand, from scratch, we can rely on pre-existing map services (e.g. Google Maps, OpenStreetMap, etc.). As you know, these maps even allow the user to pan and zoom to a location to inspect it more closely. So how do we implement such a map layer?

In JavaScript that are, as always, many different libraries to make this possible. The three most commonly used libraries are [Leaflet](https://leafletjs.com/), [OpenLayers](https://openlayers.org/), and [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/). Each of these rougly work in the same way: you select a DOM element to create the map inside of; you set some specific properties (e.g. zoom level, bounds); and instruct the library to start drawing the map. For example, with Leaflet, this will create a simple map inside of this div `<div id='myMapDiv'></div>`:

```js
const map = L.map('myMapDiv').setView([103.8198, 1.3521], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)
```

If you peruse the documentation of these libraries, you will find that each also has their own logic to add additional layers (with points, lines or polygons based on your data) on top of the basemap layer. The syntax for this is usually quite straightforward but it does mean we have to let go of the convenience of the grammar of graphics.

In the short example above, you also see that we are not using Svelte's template syntax but a more imperative approach to creating the resulting map. However, there are some ways to integrate each of these mapping libraries a bit more into Svelte's template syntax. Rich Harris has created [a nice example of this](https://svelte.dev/examples#context-api) with Mapbox GL. To go one step further, we can also integrate or synchronize our basemap with a `florence` visualization so the latter can function as a map overlay that you can build with the grammar of graphics. In the next video, I will walk through this approach. You can see the end result in the sandbox below as well.

::: div callout
<iframe title="IDV Week 13 Mapbox GL + Florence" width="560" height="315" src="https://www.youtube-nocookie.com/embed/emD1is4fnoM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

::: codesandbox sandboxes/week13_mapbox codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::