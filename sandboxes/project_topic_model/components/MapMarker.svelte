<script>
	import { getContext } from 'svelte';
	import { mapbox, key } from '../utils/mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let feature;
	export let label;

	const popup = new mapbox.Popup({ offset: 25 })
		.setText(label);

	const marker = new mapbox.Marker()
		.setLngLat(feature.geometry.coordinates)
		.setPopup(popup)
		.addTo(map);
</script>