import { writable } from "svelte/store";

const meetups = writable([
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
    isFavorite: false,
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
    isFavorite: false,
  },
]);
const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    };
    meetups.update((items) => {
      return [newMeetup, ...items];
    });
  },

  updateMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: (id)=>{
    meetups.update(items => {
      return items.filter(i => i.id !== id)
    })
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex((m) => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
