import {useState, useEffect} from "react";

export default function LoadingScreen() {
  const [currentGif, setCurrentGif] = useState(0);
  const gifs = [
    "/binary.gif",
    "/ai_head.gif",
    "/hacker_dancing.gif",
    "/spykids_enhance.gif",
  ];

  //Change GIF every 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentGif((prev) => (prev + 1) % gifs.length);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentGif]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 9998,
      }}
    >
      <img
        src={gifs[currentGif]}
        alt="loading gif"
        style={{
          position: "fixed",
          width: "auto",
          height: "auto",
          zIndex: 9999,
        }}
      />
    </div>
  );
}
