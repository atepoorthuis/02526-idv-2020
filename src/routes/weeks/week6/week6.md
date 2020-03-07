---
solution: false
---
# Week 6: Declarative & Reactive Programming II (Svelte cont'd + D3)

## Introduction
In the previous block, we have started to get familiar with using JavaScript to construct our visualizations in a more programmatic way. Although JavaScript comes with a lot of potential, we have also seen that it can create quite a bit of mental overhead when using it to create our visualization! One of the main drawbacks of the approach we have used so far is that we had to deal with different 'domains' or 'registers' in which our visualization is created. In its simplest form, the Document Object Model (DOM) is written down in HTML (Week 1 & 2) but once we add in JavaScript, the DOM can be expressed and manipulated from both HTML and JS! As we have seen, with JavaScript we have to 'reach' into the existing DOM, extract some elements, manipulate them and then, ultimately, put the results back. Meanwhile, we have to keep a mental picture of the DOM in our head because unlike HTML, JS doesn't really tell us how the DOM might look like at that point in time. That's a lot to keep track off – especially once we graduate from our relatively simple, static charts.

## Template Syntax: Event Handlers
click, console.log, then move x pos, then use data from element

## Template Syntax: If Blocks
with caption legend thing from week 4, combine with click

## Scales & Importing Libraries
d3 import, use of scale, also extend to importing data

## Component Abstraction
extract bar element