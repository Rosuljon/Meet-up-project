<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isEmailValid } from "../helpers/validations";
  import meetups from "./meetups-store";
  export let id = null;
  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let describtion = "";
  let imageUrl = "";
  if(id){
    const unsubscribe = meetups.subscribe(items =>{
      const selectedItem = items.find(i => i.id === id);
      title = selectedItem.title;
      subtitle = selectedItem.subtitle;
        describtion = selectedItem.describtion;
        imageUrl = selectedItem.imageUrl;
        address = selectedItem.address;
        email = selectedItem.contactEmail;
        
      
    })
    unsubscribe();
  }
  $: formIsValid =
    !isEmpty(title) &&
    !isEmpty(subtitle) &&
    !isEmpty(address) &&
    !isEmpty(describtion) &&
    !isEmpty(imageUrl) &&
    isEmailValid(email);
  const dispatch = createEventDispatcher();
  function submitHandler() {
    const meeetupData = {
        title:title,
        subtitle:subtitle,
        describtion:describtion,
        imageUrl:imageUrl,
        address:address,
        contactEmail: email,
    }
    if(id){
      fetch(`https://meet-up-svelte-default-rtdb.firebaseio.com/meetups/${id}.json`,{
        method : "PATCH",
        body : JSON.stringify(meeetupData),
        headers : {"Content-Type" : "application/json"}
      }).then(res =>{
        if(!res.ok){
          throw new Error("Failed to post data");
        }
        meetups.updateMeetup(id,meeetupData);
      }).catch(err =>{
        console.log(err);
      })
    }else{
      fetch("https://meet-up-svelte-default-rtdb.firebaseio.com/meetups.json",{
        method : "POST",
        body : JSON.stringify({...meeetupData, isFavorite : false},),
        headers : {"Content-Type" : "application/json"}
      }).then(res =>{
        if(!res.ok){
          throw new Error("Failed to post data");
        }
        return res.json()
      }).then(data => {
        meetups.addMeetup({...meeetupData, isFavorite : false, id : data.name });
      }).catch(err =>{
        console.log(err);
      })
    }
    dispatch("save");
  }
  function cancel() {
    dispatch("cancel");
  }
  function deleteMeetup(){
    fetch(`https://meet-up-svelte-default-rtdb.firebaseio.com/meetups/${id}.json`,{
        method : "DELETE",
      }).then(res =>{
        if(!res.ok){
          throw new Error("Failed to post data");
        }
        meetups.removeMeetup(id)
      }).catch(err =>{
        console.log(err);
      })
    dispatch("save");
  }
</script>

<Modal title="Enter a new Meetup" on:cancel>
  <form on:submit|preventDefault={submitHandler}>
    <TextInput
      id="title"
      label="Title"
      valid={!isEmpty(title)}
      validityMessage="please enter a valid title"
      value={title}
      on:input={(events) => (title = events.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={!isEmpty(subtitle)}
      validityMessage="please enter a valid subtitle"
      value={subtitle}
      on:input={(events) => (subtitle = events.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      valid={!isEmpty(address)}
      validityMessage="please enter a valid address"
      value={address}
      on:input={(events) => (address = events.target.value)}
    />
    <TextInput
      type="email"
      id="email"
      label="Email"
      valid={isEmailValid(email)}
      validityMessage="please enter a valid email"
      value={email}
      on:input={(events) => (email = events.target.value)}
    />
    <TextInput
      type="text"
      id="imageUrl"
      label="ImageUrl"
      valid={!isEmpty(imageUrl)}
      validityMessage="please enter a valid imageUrl"
      value={imageUrl}
      on:input={(events) => (imageUrl = events.target.value)}
    />
    <TextInput
      controlType="textarea"
      rows="3"
      id="description"
      label="Description"
      valid={!isEmpty(describtion)}
      validityMessage="please enter a valid description!"
      bind:value={describtion}
    />
  </form>
  <div slot="footer">
    <Button type="submit" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="submit" disabled={!formIsValid} on:click={submitHandler}>Save</Button>
    {#if id}
      <Button on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
