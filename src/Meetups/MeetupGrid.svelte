<script>
    import MeetupFilter from "./MeetupFilter.svelte";
    import MeetupItem from "./MeetupItem.svelte";
    import Button from "../UI/Button.svelte";
    import {createEventDispatcher} from "svelte";
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
</style>
<section id = "meetup-filter">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={()=>dispatch("add")}>New MeetUp</Button>
</section>
<section id="meetup">
    {#each filteredMeetups as meetup}
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
    {/each}
  </section>