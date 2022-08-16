<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import meetups from "./Meetups/meetups-store";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
import LoadingSpinner from "./UI/LoadingSpinner.svelte";
   let isLoading = true;
  fetch("https://meet-up-svelte-default-rtdb.firebaseio.com/meetups.json").then(res =>{
    if(!res.ok){
      throw new Error("Failed to catch");
    }
    return res.json();
  }).then(data => {
    const loadedMeetups = [];
    for (const key in data){
      loadedMeetups.push({
        ...data[key],
        id : key
      })
    }
    setTimeout(()=>{
      isLoading = false;
      meetups.setMeetup(loadedMeetups.reverse())
    },1000)
  }).catch(err => {
    isLoading = false
    console.log(err);
  })
 
  let editMode = null;
  let page = "overview";
  let pageId = {};
  let editId;
  
  function savedMeetup() {
    editMode = null;
    editId = null;
  }
  function showDetail(event){
    page = "detail";
    pageId.id = event.detail;
  }
  function closeDetail(){
    page = "overview";
    pageId = {};
  }
  function editMeetup(event){
    editMode = "edit";
    editId = event.detail;
  }
  function cancelEdit(){
    editMode = null;
    editId = null
  }
</script>

<Header />
<main>
  {#if page === "overview"}
  {#if editMode === "edit"}
  <EditMeetup id={editId} on:save={savedMeetup} on:cancel={cancelEdit}/>
  {/if}
  {#if isLoading}
    <LoadingSpinner />
    {:else}
    <MeetupGrid meetups={$meetups} on:page={showDetail} on:edit={editMeetup} on:add={()=> {editMode = "edit"}} />
  {/if}
  {:else}
  <MeetupDetail id={pageId.id} on:close={closeDetail} />
  {/if} 
</main>

<style>
  main {
    margin-top: 5rem; 
  }
</style>
