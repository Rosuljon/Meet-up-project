<script>
    import MeetupFilter from "./MeetupFilter.svelte";
    import MeetupItem from "./MeetupItem.svelte";
    import Button from "../UI/Button.svelte";
    import {createEventDispatcher} from "svelte";
    import {scale} from "svelte/transition";
    import {flip} from "svelte/animate";
    export let meetups;
    const dispatch = createEventDispatcher();
    let favsOnly = false;
    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;
    function setFilter(event){
        favsOnly = event.detail === 1;
        
        }
</script>

<style>
    #meetup{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
    @media (min-width: 768px){
        #meetup {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    #meetup-filter{
        margin: 1rem;
        display: flex;
        justify-content:space-between;
    }
    .no-meetup{
        margin: 1rem;
    }
</style>
<section id = "meetup-filter">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={()=>dispatch("add")}>New MeetUp</Button>
</section>
{#if filteredMeetups.length === 0}
    <p class="no-meetup">No meetups found, you can start adding some.</p>
{/if}
<section id="meetup">
    {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{duration:300}}>
        <MeetupItem
          id = {meetup.id}
          title={meetup.title}
          subtitle={meetup.subtitle}
          describtion={meetup.describtion}
          imageUrl={meetup.imageUrl}
          contactEmail = {meetup.contactEmail}
          address = {meetup.address}
          isFav = {meetup.isFavorite}
          on:page
          on:edit
        />
    </div>
    {/each}
  </section>