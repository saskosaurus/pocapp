let posts = [
  {
    id: "1",
    postedBy: "user name1",
    description: "description1",
    imageUrl: "https://fastly.picsum.photos/id/581/200/300.jpg?hmac=Xsg_aDXsNDPBGUvQPMKuMn2f4XS6zkrgh0vnl2lzljk",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fssd2581ff4e2902",
  },
  {
    id: "2",
    postedBy: "user name2",
    description: "description2",
    imageUrl: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a042581f4e2902",
  },
  {
    id: "3",
    postedBy: "user name3",
    description: "description3",
    imageUrl: "https://fastly.picsum.photos/id/581/200/300.jpg?hmac=Xsg_aDXsNDPBGUvQPMKuMn2f4XS6zkrgh0vnl2lzljk",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fdfd2581ff4e2902",
  },
  {
    id: "4",
    postedBy: "user name4",
    description: "description4",
    imageUrl: "https://fastly.picsum.photos/id/576/200/300.jpg?grayscale&hmac=9GNPADlzUZzvAQmoTeuejrdjLwyY2Lus4ilasJbzX90",
    likes: 10,
    postedAt: getCurrendDateFormatted(),
    avatarImgUrl: "https://i.pravatar.cc/150?u=a04fdf1ff4e2902",
  },
];

function getCurrendDateFormatted() {
  return new Date().getDay() + "." + new Date().getMonth() + "." + new Date().getFullYear();
}
export { posts };
