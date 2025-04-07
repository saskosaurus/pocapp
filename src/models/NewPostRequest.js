import ShortUniqueId from "short-uuid";

export class NewPostRequest {
  constructor(postedBy, title, description, image) {
    this.id = ShortUniqueId().new();
    this.postedBy = postedBy;
    this.title = title;
    this.description = description;
    this.image = image;
    this.postedAt = Date.now();
    this.likes = 0;
    this.comments = [];
  }

  toJSON() {
    return {
      id: this.id,
      postedBy: this.postedBy,
      title: this.title,
      description: this.description,
      image: this.image,
      postedAt: this.postedAt,
      likes: this.likes,
      comments: this.comments,
    };
  }
}
