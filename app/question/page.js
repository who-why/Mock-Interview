"use client";
import { useRouter } from "next/navigation";
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
    isRecording, setIsRecording,
    selectedSkillName, 
    
  } = useContext(MyContext);

  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoStreamRef = useRef(null);
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
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === "videoinput");
      const hasMic = devices.some((device) => device.kind === "audioinput");

      if (!hasCamera || !hasMic) {
        alert("No camera or microphone found. Please connect a device.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoStreamRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      setIsRecording(true);
      setTimer(60);

      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      startSpeechRecognition(); // Start speech-to-text when recording starts
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Failed to access media devices. Check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (videoStreamRef.current && videoStreamRef.current.srcObject) {
      videoStreamRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoStreamRef.current.srcObject = null;
    }

    stopSpeechRecognition(); // Stop speech-to-text when recording stops
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  // Speech Recognition (Audio-to-Text)
  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true; // Get real-time updates
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setUserAnswer(transcript); // Update text area in real-time
    };

    recognitionRef.current.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setQaPairs((prevPairs) => [
      ...prevPairs,
      { question: currentQuestion, answer: userAnswer },
    ]);

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

      <form onSubmit={handleFormSubmit} className="w-full md:w-[70%] flex flex-col gap-3 mt-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <video ref={videoStreamRef} autoPlay muted className="w-full md:w-[70%] max-h-[500px] bg-black rounded shadow" />
          </div>

          <textarea
            className="p-2 border rounded resize-none border-black"
            rows="4"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer here..."
            required
          />
        </div>

        <div className="flex items-center gap-5 justify-around mt-4">
          <button
            type="button"
            className={`px-4 py-2 rounded transition ${
              isRecording ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" disabled={loading}>
            {loading ? "Submitting..." : "Submit Answer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
