<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isEmailValid } from "../helpers/validations";
  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let describtion = "";
  let imageUrl = "";
  $: formIsValid =
    !isEmpty(title) &&
    !isEmpty(subtitle) &&
    !isEmpty(address) &&
    !isEmpty(describtion) &&
    !isEmpty(imageUrl) &&
    isEmailValid(email);
  const dispatch = createEventDispatcher();
  function submitHandler() {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      address: address,
      email: email,
      describtion: describtion,
      imageUrl: imageUrl,
    });
  }
  function cancel() {
    dispatch("cancel");
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
      validityMessage="please enter a valid description"
      bind:value={describtion}
    />
  </form>
  <div slot="footer">
    <Button type="submit" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="submit" disabled={!formIsValid} on:click={submitHandler}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
