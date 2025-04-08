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
}
