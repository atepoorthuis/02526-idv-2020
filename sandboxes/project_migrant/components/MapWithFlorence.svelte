<script>
	import { onMount, setContext, createEventDispatcher } from 'svelte'
	import { mapbox, key } from '../utils/mapbox.js'

	const dispatch = createEventDispatcher()
	setContext(key, {
		getMap: () => map
	})

	export let center
  export let zoom

  export let width
  export let height

	let map
	let container
	

	onMount(() => {
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: center,
			zoom
		})
		dispatch('load', map)
		map.on('render', () => dispatch('pan', map.getBounds()))
		map.on('zoom', () => dispatch('zoom', map.getBounds()))

		return () => {
			map.remove()
		}
	})
</script>

<div style="width: {width}px; height: {height}px;" bind:this={container}>
</div>