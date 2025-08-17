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

  const prepareImageForBackend = (file) => {
    console.log("Ready to send to backend:", file);
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
      <div className={styles.chatWindow}>
        {" "}
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded image"
            className={styles.previewImage}
          />
        ) : (
          "Please upload an image"
        )}
      </div>
      <form className={styles.textInputContainer}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </form>
    </div>
  );
}
