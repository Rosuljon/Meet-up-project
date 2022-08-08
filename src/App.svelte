<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
 
  let editMode = null;
  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn code in 2 hours",
      describtion:
        "In this meetup, we will have some experts that teach you how to code",
      imageUrl:
        "https://www.trilogyed.com/blog/wp-content/uploads/2018/05/columbia_coding_boot_camp2_brandon_colbert.jpg",
      address: "Yongsan-gu, itaewon-ro, 17",
      contactEmail: "code@test.com",
      isFavorite : false,
    },
    {
      id: "m2",
      title: "Fotball Training",
      subtitle: "Have a football in sunday",
      describtion: "In this meetup, we will play a football",
      imageUrl:
        "https://media.istockphoto.com/photos/close-up-of-legs-and-feet-of-football-player-in-blue-socks-and-shoes-picture-id1150952747?k=20&m=1150952747&s=612x612&w=0&h=vreccM0RO2rNp4aLN-mLyBwTfN7sfwvkdkwegzYPrXo=",
      address: "Yongsan-gu, itaewon-ro, 17",
      contactEmail: "football@test.com",
      isFavorite: false
    },
  ];
  function submitHandler(event) {
    meetups = [{
        id: Math.random().toString(),
        title:event.detail.title,
        subtitle:event.detail.subtitle,
        describtion:event.detail.describtion,
        imageUrl:event.detail.imageUrl,
        address:event.detail.address,
        contactEmail : event.detail.email
    },...meetups]
    editMode = null;
  }
  function toogleFavorite(event){
    const id = event.detail;
    const updatedMeetup = {...meetups.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;

  }
</script>

<Header />
<main>
  <Button on:click={ () => editMode="add"}>New MeetUp</Button>
  {#if editMode === "add"}
  <EditMeetup on:save={submitHandler} on:cancel={() => {editMode=null}}/>
  {/if}
  <MeetupGrid {meetups} on:tooglefavorite={toogleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem; 
  }
</style>
