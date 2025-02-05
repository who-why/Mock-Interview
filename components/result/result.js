"use client";

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context";

const Result = () => {
  const { qaPairs, getFeedbackFromAI, feedback } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  // Fetch feedback when the component loads

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      await getFeedbackFromAI();
      setLoading(false);
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse">
          <p className="text-lg font-semibold text-gray-600">Analyzing your answers...</p>
        </div>
      </div>
    );
  }

  if (!feedback || feedback.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-gray-600">No feedback available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-6">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-wide">
          🎯 Interview Performance Report
        </h1>

        {/* Overall Performance Card */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Overall Performance</h2>
          <p className="text-lg font-bold text-gray-900">
            ✅ Correctness: {feedback[0]?.feedback.correctness}
          </p>
        </div>

        {/* Questions & Answers Section */}
        <div className="w-full flex flex-col gap-8 mt-10">
          {qaPairs.map((pair, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-200 transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                ❓ Question {index + 1}
              </h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">{pair.question}</p>

              <h3 className="text-md font-semibold text-green-500">📝 Your Answer:</h3>
              <p className="text-gray-800 mb-4">{pair.answer}</p>

              {feedback[index]?.feedback ? (
                <div className="flex flex-col mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-lg font-semibold text-indigo-500">📊 Feedback:</h3>
                  <p className="text-gray-800">
                    <strong>✅ Correctness:</strong> {feedback[index].feedback.correctness}
                  </p>
                  <p className="text-gray-800">
                    <strong>💪 Strengths:</strong> {feedback[index].feedback.strengths}
                  </p>
                  <p className="text-gray-800">
                    <strong>⚠ Weaknesses:</strong> {feedback[index].feedback.weaknesses}
                  </p>
                  <p className="text-gray-800">
                    <strong>💡 Suggestions:</strong> {feedback[index].feedback.suggestions}
                  </p>
                </div>
              ) : (
                <p className="text-red-500 mt-2">⚠ Feedback not available.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
