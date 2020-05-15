<script>
	import { onMount, setContext } from 'svelte'
	import { mapbox, key } from '../utils/mapbox.js'

	setContext(key, {
		getMap: () => map
	})

	export let center
  export let zoom

  export let width
  export let height

	let container
	let map

	onMount(() => {
			map = new mapbox.Map({
				container,
				style: 'mapbox://styles/mapbox/streets-v9',
				center: center,
				zoom
			})

		return () => {
			map.remove()
		}
	})
</script>

<div style="width: {width}px; height: {height}px" bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>