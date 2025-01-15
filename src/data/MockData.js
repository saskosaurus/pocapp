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
    title: "title1",
    description: "description1",
    imageUrl: "https://picsum.photos/550/550",
    likes: 10,
    postedAt: Date.now() - 60000000,
    comments: [
      { content: "komentar1", postedBy: users[1] },
      { content: "komentar2", postedBy: users[0] },
      { content: "komentar3", postedBy: users[3] },
      { content: "komentar4", postedBy: users[2] },
    ],
  },
  {
    id: 2,
    postedBy: users[1],
    title: "title2",
    description: "description2",
    imageUrl: "https://picsum.photos/550/600",
    likes: 10,
    postedAt: Date.now() - 10000000,
    comments: [{ content: "komentar1", postedBy: users[3] }],
  },
  {
    id: 3,
    postedBy: users[2],
    title: "title3",
    description: "description3",
    imageUrl: "https://picsum.photos/600/600",
    likes: 10,
    postedAt: Date.now() - 20000000,
    comments: [
      { content: "komentar1", postedBy: users[0] },
      { content: "komentar4", postedBy: users[3] },
    ],
  },
  {
    id: 4,
    postedBy: users[3],
    title: "title4",
    description: "description4",
    imageUrl: "https://picsum.photos/600/500",
    likes: 10,
    postedAt: Date.now() - 30000000,
    comments: [
      { content: "komentar1", postedBy: users[1] },
      { content: "komentar2", postedBy: users[0] },
      { content: "komentar3", postedBy: users[3] },
      { content: "komentar4", postedBy: users[2] },
    ],
  },
]);

export { posts };
