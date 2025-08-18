import {useState, useEffect} from "react";

import styles from "./Chatbot.module.css";

export default function Chatbot() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    prepareImageForBackend(file);
  };

  const prepareImageForBackend = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Backend response:", data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  //Before uploading a new image the useEffect will revoke the previous imageURL to prevent memory leakage
  //Just deletes the old image before the new on mounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.output}>
        <p>Welcome to TURNERS CAR INSURANCE Premium Analysis Unit.</p>
        <p>Please upload an image of a car</p>
        <br />
      </div>
      <label className={styles.uploadImageContainer}>
        Select Image
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>
      {imagePreview ? (
        <div className={styles.imagePreviewContainer}>
          <img
            src={imagePreview}
            alt="Uploaded image"
            className={styles.imagePreview}
          />
        </div>
      ) : (
        "Please upload an image"
      )}
    </div>
  );
}
