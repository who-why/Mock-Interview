"use client";
import React, { createContext, useEffect, useState } from "react";
import problem from "../data/ques";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [qaPairs, setQaPairs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  const getRandomQuestion = () => {
    if (problem.length > 0) {
      const randomIndex = Math.floor(Math.random() * problem.length);
      return problem[randomIndex];
    }
    return "No questions available";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setQaPairs((prev) => [
      ...prev,
      { question: currentQuestion, answer: userAnswer },
    ]);
    setUserAnswer("");
    setCurrentQuestion(getRandomQuestion());

    //  console.log("Q&A Pairs:", qaPairs);
  };

  useEffect(() => {
    console.log("Updated Q&A Pairs:", qaPairs);
  }, [qaPairs]);

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
        getRandomQuestion,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
