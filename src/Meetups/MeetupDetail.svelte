<script>
import Button from "../UI/Button.svelte";
import meetups from "./meetups-store";
import {onDestroy, createEventDispatcher} from "svelte";
export let id;
let selectedItem;
const unsubscribe = meetups.subscribe(items => {selectedItem = items.find(i => i.id === id)});
const dispatch = createEventDispatcher()
onDestroy(()=>{
    unsubscribe();
})
</script>

<style>
    section {
  margin-top: 4rem;
}

.image {
  width: 100%;
  height: 25rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image {
  background: #e7e7e7;
}

.content {
  text-align: center;
  width: 80%;
  margin: auto;
}

h1 {
  font-size: 2rem;
  font-family: 'Roboto Slab', sans-serif;
  margin: 0.5rem 0;
}

h2 {
  font-size: 1.25rem;
  color: #6b6b6b;
}

p {
  font-size: 1.5rem;
}

</style>

<section>
    <div class="image">
        <img src="{selectedItem.imageUrl}" alt="{selectedItem.title}">
    </div>
    <div class="content">
        <h1>{selectedItem.title}</h1>
        <h2>{selectedItem.subtitle} - {selectedItem.address}</h2>
        <p>{selectedItem.describtion}</p>
        <Button href="mailto:{selectedItem.contactEmail}" >Contact</Button>
        <Button type="button" mode="outline" on:click={()=>{dispatch("close")}}>Close</Button>
    </div>

</section>