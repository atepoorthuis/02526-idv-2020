<!-- <style>
	.box {
	  width: 150px;
	  border: 1px solid #aaa;
	  border-radius: 2px;
	  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
	  padding: 1em;
	  margin: 0 0 1em 0;
	}
</style>

<div class="box">
	<slot></slot>
</div> -->

<!-- BOX DETAILS -->
<style>
	.box {
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 10% 10%;
    margin: 0 0 0 0;
		font-family: "Josefin Sans", sans-serif;
    font-weight: 5px;
    text-align: center;
    color: rgb(10, 96, 132);
	font-size: 12px;
	}

	h2 {
		padding: 0 0 0 0;
		margin: 0 0 1em 0;
		font-weight: 10px;
		font-size: 12px;

	}

	.address {
		padding: 0 0 0 0;
		background:  0 0 no-repeat;
		background-size: 20px 20px;
		margin: 0 0 0.5em 0;
		line-height: 1;
	}

	.address { background-image: url(tutorial/icons/map-marker.svg) }
	.missing { color: #999 }
</style>

<article class="box">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

</article>