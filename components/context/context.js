"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import juniorLevelQuestions from '../data/juniorLevel'
import midLevelQuestions from "../data/midLevelQuestions";
import seniorLevelQuestions from "../data/seniorLevelQuestions";

import { v4 as uuidv4 } from "uuid";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [qaPairs, setQaPairs] = useState([]);
  const [selectedSkillName, setSelectedSkillName] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [Explvl, setExplvl] = useState("junior");

  console.log("Selected Skill:", selectedSkillName, "Experience Level:", Explvl);

  // Determine the question set based on experience level
  const getQuestionSet = () => {
    switch (Explvl) {
      case "mid":
        return midLevelQuestions;
      case "senior":
        return seniorLevelQuestions;
      default:
        return juniorLevelQuestions;
    }
  };

  const problem = getQuestionSet();

  // Function to get a random question from the selected skill
  const getRandomQuestionFunc = useCallback(() => {
    if (!selectedSkillName || selectedSkillName.trim() === "") {
      return "Please select a skill first.";
    }

    const selectedSkill = problem.find(skill => skill[0] === selectedSkillName);

    if (selectedSkill && selectedSkill[1].length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedSkill[1].length);
      return selectedSkill[1][randomIndex];
    }

    return "No questions available for this skill.";
  }, [selectedSkillName, problem]);

  useEffect(() => {
    if (selectedSkillName) {
      setCurrentQuestion(getRandomQuestionFunc());
    }
  }, [selectedSkillName, getRandomQuestionFunc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQaPairs((prev) => [
      ...prev,
      { id: uuidv4(), question: currentQuestion, answer: userAnswer },
    ]);
    setUserAnswer("");
    setCurrentQuestion(getRandomQuestionFunc());
  };

  const getFeedbackFromAI = useCallback(async () => {
    try {
      console.log("getFeedbackFromAI called. qaPairs:", qaPairs);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qaPairs.map(item => ({ ques: item.question, ans: item.answer }))),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("HTTP Error:", response.status, errorData);
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData?.error || 'Unknown error'}`);
      }

      const data = await response.json();
      if (data.error) {
        console.error("API Error:", data.error);
        return;
      }

      setFeedback((prevFeedback) => [
        ...prevFeedback,
        ...data.feedbackResults.map(fb => ({ ...fb, id: uuidv4() }))
      ]);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, [qaPairs]);

  useEffect(() => {
    if (qaPairs.length > 0) {
      console.log("Calling getFeedbackFromAI from useEffect. qaPairs:", qaPairs);
      getFeedbackFromAI();
    }
  }, [qaPairs, getFeedbackFromAI]);

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
        getFeedbackFromAI,
        feedback,
        isRecording,
        setIsRecording,
        selectedSkillName,
        setSelectedSkillName,
        Explvl,
        setExplvl,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
