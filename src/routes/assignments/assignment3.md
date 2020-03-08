# Assignment 3

For your third assignment, you will recreate your graph from the first two assignments once more, but now utilizing the Svelte front-end framework. A few things to consider:

- Experiment with the foundational concepts you have learned so far. At the very least you should consider:
  1. Store your chart data in an array or object.
  2. Make use of Svelte's template syntax, including `each` and `if` blocks where appropriate, to express your visualization.
  3. No longer rely on your own pixel measurements derived from the original char but use the `scaleLinear` function from `d3-scale` to convert data values to the appropriate pixel values.
- Deviate from Du Bois' original work in one important way: think of a way to add a simple user interaction to your graph. This could be purely visual (e.g. color change; slight change in size of an element; a small positional jump) or more informative (e.g. a tooltip that displays information about a chart element).
- If your original graph does not work so well for this assignment, feel free to pick a different one.


You can use the boilerplate CodeSandbox below as a starting point or use the CodeSandbox from your previous assignment. Once you are finished, navigate to your own Github repository at https://github.com/02526-idv/[your-name]. Create a new issue, title it 'Assignment 3 by [your_name]', and include both a screenshot of the final result as well as a link to the CodeSandbox that belongs to Assignment 3.

::: codesandbox sandboxes/boilerplate_assignment3 codemirror=1&view=split&fontsize=12&hidenavigation=1&hidedevtools=1&theme=light&module=App.svelte
:::
