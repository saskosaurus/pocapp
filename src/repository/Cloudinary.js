import axios from "axios";

let Cloudinary = {
  async uploadImageToCloudinary(file) {
    if (!file) {
      console.alert("Image file is missing!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pocgramUnsigned");
      const response = await axios.post("https://api.cloudinary.com/v1_1/dm1eb7sdv/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload to storage successful");
      return response.data.secure_url;
    } catch (error) {
      console.error("Storage upload failed", error);
      return null;
    }
  },
};

export default Cloudinary;
