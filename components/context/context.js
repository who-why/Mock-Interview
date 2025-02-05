"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import problem from "../data/ques"; // Assuming this is your question list
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique keys

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [qaPairs, setQaPairs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestionFunc());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState([]); // Store AI feedback as an array
   const [isRecording, setIsRecording] = useState(false);

  // Function to get a random question (defined outside component to prevent recreation)
  function getRandomQuestionFunc() {
    if (problem.length > 0) {
      const randomIndex = Math.floor(Math.random() * problem.length);
      return problem[randomIndex];
    }
    return "No questions available";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setQaPairs((prev) => [
      ...prev,
      { id: uuidv4(), question: currentQuestion, answer: userAnswer }, // Add unique ID
    ]);
    setUserAnswer("");
    setCurrentQuestion(getRandomQuestionFunc()); //Get new Question after submit
    
  };

  // useCallback is used here to memorize the function
  const getFeedbackFromAI = useCallback(async () => {
    try {
      console.log("getFeedbackFromAI called.  qaPairs:", qaPairs); // DEBUG

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qaPairs.map(item => ({ques: item.question, ans: item.answer}))), // Send the correct format
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json(); // Try to parse error message
        console.error("HTTP Error:", response.status, errorData);
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData?.error || 'Unknown error'}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error("API Error:", data.error);
        return;
      }

      // Append new feedback to the existing array
      setFeedback((prevFeedback) => {
        const newFeedback = data.feedbackResults.map(fb => ({ ...fb, id: uuidv4() }));  // Add unique ID
        return [...prevFeedback, ...newFeedback];
      });
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, [qaPairs]); // Dependency array: React will only recreate the callback when `qaPairs` changes.  This is VERY important.

  // useEffect(() => {
  //   // Log feedback to console when it changes
  //   console.log("Feedback:", feedback);
  // }, [feedback]);

  useEffect(() => {
    if (qaPairs.length > 0) {  // Only call if qaPairs has data
      console.log("Calling getFeedbackFromAI from useEffect. qaPairs:", qaPairs); // DEBUG
      getFeedbackFromAI();
    }
  }, [qaPairs, getFeedbackFromAI]); // `getFeedbackFromAI` is also a dependency because it's useCallback

  return (
    <MyContext.Provider
      value={{
        qaPairs,
        setQaPairs,
        currentQuestion,
        setCurrentQuestion,
        userAnswer,
        setUserAnswer,
        handleSubmit,
        getRandomQuestion: getRandomQuestionFunc,
        getFeedbackFromAI, // Function to fetch feedback
        feedback, // AI-generated feedback
        isRecording, setIsRecording,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};