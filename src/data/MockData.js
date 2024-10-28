import { reactive } from "vue";
let posts = reactive([
  {
    id: "1",
    postedBy: "user name1",
    description: "description1",
    imageUrl: "https://picsum.photos/550/550",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fssd2581ff4e2902",
  },
  {
    id: "2",
    postedBy: "user name2",
    description: "description2",
    imageUrl: "https://picsum.photos/550/600",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a042581f4e2902",
  },
  {
    id: "3",
    postedBy: "user name3",
    description: "description3",
    imageUrl: "https://picsum.photos/600/600",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fdfd2581ff4e2902",
  },
  {
    id: "4",
    postedBy: "user name4",
    description: "description4",
    imageUrl: "https://picsum.photos/600/500",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fdf1ff4e2902",
  },
]);

function getCurrendDateFormatted() {
  return new Date().getDay() + "." + new Date().getMonth() + "." + new Date().getFullYear();
}
export { posts };
