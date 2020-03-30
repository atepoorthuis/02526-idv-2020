---
solution: true
---
# Week 10: Interaction

## Introduction
In the past week, we have moved from creating individual, stand-alone charts to multiple views or facets on the same dataset. To create visualization systems, there is a final set of functionalities that can be utilized to help derive insights from visualization: user interaction. This week, we will introduce interaction in two steps. First, we will make use of other elements on the page to provide user interaction. Second, we will use the visualizations themselves as a way for the user to interact with the underlying data.

## Using external UI elements
Up until now, we have created graphs that display all data by default. However, in the case of HDB resale transactions, we might expect quite a different distribution of many of the variables (e.g. price, remaining lease) in the dataset for each individual town. Anecdotally, for example, we might expect flats in Punggol to be larger than flats in the older Toa Payoh.

One way to enable this type of exploration, is by adding a dropdown menu that will filter the dataset based on the user's choice. We can create dropdown elements with the [`<select>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) (see the [Svelte examples on bindings](https://svelte.dev/examples#select-bindings) for an implementation example). 

In this section, we will use the final sandbox of Week 9 as a starting point.


::: codesandbox sandboxes/week9_stage_5 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::

Our goal is to add a dropdown menu that lists all the town names. When a user selects a town, the dashboard will update to only display the resale transactions within that town. To do this, we will need to walk through the following steps:

1. Create a variable that contains all the unique town names.
2. Construct a `<select>` element with the appropriate `<option>`s.
3. [Bind](https://svelte.dev/docs#bind_element_property) the right value to a variable used to store the selected town.
4. Update the data used for the dashboard accordingly.

::: div callout
We will do this section in class together.
:::

::: solution
::: codesandbox sandboxes/week10_stage_1 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::

## Using a visualization itself as a UI
Instead of using an external UI element to interact with a visualization, we can also use (elements of) a visualization itself. For example, instead of selecting an option from a dropdown menu, we can select a (categorical) option in one view, and update another view based on that choice. In our case, for example, we can use the flat type bar chart to update the data displayed in the price histogram. To do this, we need to enable the [appropriate interaction event listeners](https://florence-docs.netlify.com/docs/concepts/interactivity) on our Marks.

::: div callout
We will do this section on Thursday.
:::

::: solution
::: codesandbox sandboxes/week10_stage_2 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte&runonclick=1
:::
:::