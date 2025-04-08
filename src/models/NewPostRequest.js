import ShortUniqueId from "short-uuid";

export class NewPostRequest {
  constructor(postedBy, title, description, imageUrl) {
    this.id = ShortUniqueId().new();
    this.postedBy = postedBy;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.postedAt = Date.now();
    this.likes = 0;
    this.commentsCount = 0;
  }

  toJSON() {
    return {
      id: this.id,
      postedBy: this.postedBy,
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      postedAt: this.postedAt,
      likes: this.likes,
      commentsCount: this.commentsCount,
    };
  }
}
