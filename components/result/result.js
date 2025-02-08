"use client";

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context";

const Result = () => {
  const { qaPairs, getFeedbackFromAI, feedback } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse">
          <p className="text-lg font-semibold text-gray-600">Analyzing your answers...</p>
        </div>
      </div>
    );
  }

  if (!feedback || feedback.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-gray-600">No feedback available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Interview Results</h1>
        <p className="text-gray-500 text-center mt-1">Completed on February 8, 2025</p>

        {/* Performance Summary */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="bg-green-100 p-4 rounded-md text-center">
            <p className="text-lg font-semibold text-green-700">Accuracy</p>
            <p className="text-2xl font-bold text-green-900">{feedback[0]?.feedback.accuracy}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md text-center">
            <p className="text-lg font-semibold text-blue-700">Duration</p>
            <p className="text-2xl font-bold text-blue-900">45m</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-md text-center">
            <p className="text-lg font-semibold text-purple-700">Communication</p>
            <p className="text-2xl font-bold text-purple-900">{feedback[0]?.feedback.communication}</p>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Detailed Feedback</h2>
          <div className="mt-4">
            <p className="text-lg font-semibold text-green-700">✔ Strengths</p>
            <ul className="list-disc list-inside text-gray-700">
              {feedback[0]?.feedback.strengths.map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-yellow-700">⚠ Areas for Improvement</p>
            <ul className="list-disc list-inside text-gray-700">
              {feedback[0]?.feedback.weaknesses.map((weakness, i) => (
                <li key={i}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Question Analysis</h2>
          {qaPairs.map((pair, index) => (
            <div key={index} className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-lg font-semibold text-blue-700">❓ {pair.question}</p>
              <p className="text-gray-600 mt-1">{pair.answer}</p>
              <p className="text-sm text-gray-500">Time taken: 10 minutes</p>
            </div>
          ))}
        </div>

        {/* Recommended Next Steps */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Recommended Next Steps</h2>
          <ul className="list-disc list-inside text-gray-700">
            {feedback[0]?.feedback.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Result;
