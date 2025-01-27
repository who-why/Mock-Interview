"use client";

import React, { useContext } from "react";
import { MyContext } from "../context/context";

const Result = () => {
  const { qaPairs } = useContext(MyContext);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Final Result Of Your Interview
        </h1>

        {qaPairs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qaPairs.map((pair, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-blue-600 mb-2">
                  Question {index + 1}
                </h2>
                <p className="text-gray-700 mb-4">{pair.question}</p>

                <h3 className="text-md font-medium text-green-500">Answer:</h3>
                <p className="text-gray-800">{pair.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-500 font-medium">
              No Q&A pairs yet. Add some questions and answers!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
