import React, { useRef, useState } from "react";
import { useAlert } from "react-alert";
import Webcam from "react-webcam";
import Header from "../components/header";

export default function Selfie() {
  const webCamRef = useRef();
  const [src, setSrc] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const Alert = useAlert();

  const videoConstraints = {
    facingMode: "user",
  };

  const handleClick = () => {
    const currentWebcam: any = webCamRef.current;
    if (!currentWebcam) {
      return;
    }
    const imgSrc = currentWebcam.getScreenshot();
    setSrc(imgSrc);
    setShowPreview(false);
  };

  return (
    <div>
      <Header text="Selfie Functionality"></Header>
      <div className="my-4" onClick={handleClick}>
        <a className="my-4 mx-2 bg-black text-white py-2 px-4 rounded-md cursor-pointer">
          Capture
        </a>
      </div>
      <Webcam
        ref={webCamRef}
        videoConstraints={videoConstraints}
        style={{ display: showPreview ? "block" : "none" }}
        onUserMediaError={(e) => Alert.error(e.toString())}
      />
      <img
        className="w-40 h-40"
        src={src}
        alt=""
        style={{ display: showPreview ? "none" : "block" }}
      />
    </div>
  );
}
