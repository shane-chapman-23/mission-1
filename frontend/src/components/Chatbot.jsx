import {useState, useEffect} from "react";

import styles from "./Chatbot.module.css";
import LoadingScreen from "./LoadingScreen";

export default function Chatbot() {
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    uploadAndAnalyzeImage(file);
  };

  const uploadAndAnalyzeImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      //Artificial loading screen delay or 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Save result for UI
      setResult({
        vehicleType: data.vehicleType,
        confidence: data.confidence,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      setResult({error: "Failed to analyze image."});
    } finally {
      setLoading(false);
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
        <p>Welcome to TURNERS CAR INSURANCE Premium Analysis Unit</p>
        <p>Please upload an image of a car</p>
        <br />
      </div>
      <label className={styles.uploadImageContainer}>
        Upload Image
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>
      {imagePreview && (
        <div className={styles.imagePreviewContainer}>
          <img
            src={imagePreview}
            alt="Uploaded image"
            className={styles.imagePreview}
          />
        </div>
      )}

      <div className={styles.resultContainer}>
        {loading && <p>Vehicle Type: Analyzing...</p>}
        {result?.error && <p style={{color: "red"}}>{result.error}</p>}
        {result && !result.error && !loading && (
          <p>
            Vehicle Type: <b>{result.vehicleType}</b> <br />
          </p>
        )}
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
}
