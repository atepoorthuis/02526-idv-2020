<script>
export let imageURL = undefined
export let linkURL = undefined
export let caption = undefined
</script>

<style>
    img {
        max-height: 275px;
    }
</style>

<div class="p-1 flex flex-col justify-between">
    <a href={linkURL}>
        <img src={imageURL} alt={caption}>
    </a>
    <label class="mt-1">{caption}</label>
</div>