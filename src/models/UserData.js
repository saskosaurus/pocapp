export class UserData {
  constructor(id, email, nickname, profileImage) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.profileImage = profileImage;
  }

  static fromFirestore(docSnapshot) {
    const data = docSnapshot.data();
    return new UserData(data.userData.id, data.userData.email, data.userData.nickname, data.userData.profileImage || null);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      profileImage: this.profileImage,
    };
  }
}
