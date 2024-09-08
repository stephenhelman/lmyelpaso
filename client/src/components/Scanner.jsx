import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useScan from "../hooks/useScan";

const Scanner = () => {
  const navigate = useNavigate();
  const { setScanResult } = useScan();
  const [cameraOption, setCameraOption] = useState("environment");

  const handleChangeCamera = () => {
    if (cameraOption === "environment") {
      setCameraOption("user");
      console.log("switching to user");
      return;
    }
    if (cameraOption === "user") {
      setCameraOption("environment");
      console.log("switching to environment");
      return;
    }
  };

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    const config = { fps: 60, qrbox: { width: 500, height: 250 } };
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      return scannerCleanUp(scanner, decodedText);
    };
    const scannerCleanUp = (scanner, decodedText) => {
      scanner.stop();
      setScanResult(decodedText);
      navigate("/home/results");
    };
    if (cameraOption === "environment") {
      if (scanner.getState() !== 1) {
        scanner.stop();
      }
      scanner.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      );
    }

    if (cameraOption === "user") {
      if (scanner.getState() !== 1) {
        scanner.stop();
      }
      scanner.start({ facingMode: "user" }, config, qrCodeSuccessCallback);
    }

    return () => {
      const status = scanner.getState();
      if (status !== 1) {
        scanner.stop();
      }
    };
  }, []);

  return (
    <>
      <div className="scannerContainer">
        <div id="reader" style={{ width: 500, height: 250 }}></div>
      </div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>0</div>

      <div>
        <button onClick={handleChangeCamera}>Switch</button>
      </div>
    </>
  );
};

export default Scanner;
