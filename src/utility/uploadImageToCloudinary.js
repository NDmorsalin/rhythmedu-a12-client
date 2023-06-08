
const uploadImageToCloudinary = async (imageFile) => {
    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL; // Replace with your imgBB API key
    const cloudinaryUploadPreset = import.meta.env.VITE_CloudinaryUploadPreset; // Replace {upload_preset} with your Cloudinary upload preset
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", cloudinaryUploadPreset);
    /* 
      const formData = new FormData();
      formData.append("classImg", imageFile); */
    try {
      const req = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });
      const res = await req.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export default uploadImageToCloudinary;