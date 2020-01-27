<script>
	import Nav from '../components/Nav.svelte'
	export let segment
	let openMenu = false
</script>

<style>
.openMenu {
	@apply block;
}
</style>

<div class="flex m-5 mt-8 text-gray-800 font-serif font-light">
	<div class="block font-sans text-base font-semibold tracking-tight">
		<button on:click={() => openMenu ^= true} class="sm:hidden mb-4 mr-4 p-2 border rounded border-teal-light">
			<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
		</button>
		<div class:openMenu class="mr-12 sm:flex sm:items-center sm:w-auto hidden"><Nav {segment}/></div>
	</div>
	<main class="max-w-3xl container text-xs sm:text-sm md:text-base">
		<slot></slot>
	</main>
</div>
