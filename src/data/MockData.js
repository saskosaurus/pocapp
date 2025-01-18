import { reactive } from "vue";

let users = [
  {
    username: "Marko Marić",
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fssd2581ff4e2902",
  },
  {
    username: "Ana Anić",
    avatarImgUrl: "https://i.pravatar.cc/150?u=a042581f4e2902",
  },
  {
    username: "Pero Perić",
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fdfd2581ff4e2902",
  },
  {
    username: "Dora Dorić",
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fdf1ff4e2902",
  },
];

let posts = reactive([
  {
    id: 1,
    postedBy: users[0],
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet",
    imageUrl: "https://picsum.photos/550/550",
    likes: 7,
    postedAt: Date.now() - 60000000,
    comments: [
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[1] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[0] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[3] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[2] },
    ],
  },
  {
    id: 2,
    postedBy: users[1],
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet",
    imageUrl: "https://picsum.photos/550/600",
    likes: 13,
    postedAt: Date.now() - 10000000,
    comments: [{ content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[3] }],
  },
  {
    id: 3,
    postedBy: users[2],
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet",
    imageUrl: "https://picsum.photos/600/600",
    likes: 4,
    postedAt: Date.now() - 90000000,
    comments: [
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[0] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[3] },
    ],
  },
  {
    id: 4,
    postedBy: users[3],
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet",
    imageUrl: "https://picsum.photos/600/500",
    likes: 2,
    postedAt: Date.now() - 35000000,
    comments: [
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[1] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[0] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[3] },
      { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", postedBy: users[2] },
    ],
  },
]);

export { posts };
