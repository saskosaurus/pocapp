export class PostData {
  constructor(id, postedBy, title, description, imageUrl, postedAt, likes, commentsCount) {
    this.id = id;
    this.postedBy = postedBy;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.postedAt = postedAt;
    this.likes = likes;
    this.commentsCount = commentsCount;
  }

  static fromFirestore(docSnapshot) {
    const data = docSnapshot.data().postData;
    return new PostData(data.id, data.postedBy, data.title, data.description, data.imageUrl, data.postedAt, data.likes, data.commentsCount);
  }
}
