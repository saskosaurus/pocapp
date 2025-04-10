import ShortUniqueId from "short-uuid";
export class NewCommentRequest {
  constructor(postId, text, postedBy) {
    this.id = ShortUniqueId().new();
    this.postId = postId;
    this.text = text;
    this.postedBy = postedBy;
    this.postedAt = Date.now();
  }

  toJSON() {
    return {
      id: this.id,
      postId: this.postId,
      text: this.text,
      postedBy: this.postedBy,
      postedAt: this.postedAt,
    };
  }
}
