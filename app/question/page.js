"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { MyContext } from "../../components/context/context";
import Result from "../../components/result/result";

const Page = () => {
  const {
    qaPairs,
    setQaPairs,
    currentQuestion,
    getRandomQuestion,
    setCurrentQuestion,
    userAnswer,
    setUserAnswer,
    handleSubmit,
    isRecording, setIsRecording
  } = useContext(MyContext);
 
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoStreamRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  useEffect(() => {
    if (timer === 0 && isRecording) {
      stopRecording();
    }
  }, [timer]);

  const startRecording = async () => {
    try {
      // Start video recording
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoStreamRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start();

      // Start audio recording
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(" ");
        setUserAnswer(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current.start();

      setIsRecording(true);
      setTimer(60);

      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    // Stop video recording
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  
    if (videoStreamRef.current && videoStreamRef.current.srcObject) {
      videoStreamRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoStreamRef.current.srcObject = null; // Clear stream after stopping
    }
  
    // Stop audio recording
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  
    setIsRecording(false);
    clearInterval(timerRef.current);
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      handleSubmit(e);
      setLoading(false);
      setShowResult(true);
    }, 500);
  };

  if (showResult) {
    return <Result />;
  }

  return (
    <div className="flex flex-col items-center bg-gray-300 min-h-screen relative gap-5 p-5">
      <div className="w-full flex items-center justify-between rounded shadow p-4">
        <p className="text-lg font-bold text-center">{currentQuestion}</p>
        <span className="text-red-500 font-semibold">Time Left: {timer}s</span>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="w-full md:w-[70%] flex flex-col gap-3 mt-5"
      >
        <div className="flex flex-col gap-4">
          {/* Video Stream */}
          <div className="flex flex-col items-center gap-2">
            <video
              ref={videoStreamRef}
              autoPlay
              muted
              className="w-full md:w-[70%] max-h-[500px] bg-black rounded shadow"
            />
          </div>

          {userAnswer && (
            <textarea
              className="p-2 border rounded resize-none border-black"
              rows="4"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer here..."
              required
            />
          )}
        </div>

        <div className="flex items-center gap-5 justify-around mt-4">
          {/* Single Recording Button */}
            <button
              type="button"
              className={`px-4 py-2 rounded transition ${
                isRecording
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </button>
          </div>
        
      </form>
   
      {/* Show recorded video */}
      {/* {videoURL && (
        <div className="mt-5">
          <h3 className="text-center font-bold">Recorded Video</h3>
          <video
            src={videoURL}
            controls
            className="w-full md:w-[70%] bg-black rounded shadow"
          />
        </div>
      )} */}
    </div>
  );
};

export default Page;
