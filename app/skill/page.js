"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { MyContext } from "@/context/context";

const Page = () => {
  const [selectedSkill, setSelectedSkill] = useState();
  const { selectedSkillName, setSelectedSkillName } = useContext(MyContext);

  const toggleSkill = (index, name) => {
    if (selectedSkill === index) {
      setSelectedSkill(null);
      setSelectedSkillName("");
    } else {
      setSelectedSkill(index);
      setSelectedSkillName(name);
    }
  };

  return (
    <div className="flex flex-col p-3 gap-3 items-center">
      <h2 className="text-4xl md:text-5xl text-center font-extrabold text-gradient bg-gradient-to-r from-pink-500 via-red-500 to-pink-700 text-transparent bg-clip-text mt-6">
        Choose One Skill for the Interview
      </h2>

      <div className="w-full md:w-[70%] grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6 mt-8 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            onClick={() => toggleSkill(index, skill.name)}
            className={`relative flex flex-col items-center justify-center cursor-pointer overflow-hidden w-36 h-36 bg-gray-300 ${
              skill.bg
            } rounded-lg shadow-lg p-4 border-2 transition-all duration-300 ${
              selectedSkill === index ? "border-green-500" : "border-transparent"
            }`}
          >
            <img src={skill.icon} alt={skill.name} className="object-cover" />
            {selectedSkill === index && (
              <>
                <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 text-white flex items-center justify-center rounded-full">
                  ✓
                </div>
                <p className="mt-2 text-white font-semibold">{selectedSkillName}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedSkillName && (
        <p className="text-xl font-semibold text-gray-800 mt-4">
          Selected Skill: {selectedSkillName}
        </p>
      )}

      <div className="w-full md:w-[70%] flex items-center justify-end mt-10">
        <Link href={`/question`}>
          <button className="py-3 px-8 bg-gray-600 text-white rounded-md hover:bg-gray-500">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;

const skills = [
  {
    name: "React.js",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    bg: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    name: "Vue.js",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    bg: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    name: "Angular",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    bg: "from-green-400 via-yellow-400 to-red-500",
  },
  {
    name: "Node.js",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    bg: "from-gray-700 via-gray-900 to-black",
  },
  {
    name: "Python",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    bg: "from-red-600 via-red-800 to-gray-900",
  },
  {
    name: "Java",
    icon: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    bg: "from-blue-700 via-blue-800 to-blue-900",
  },
  {
    name: "CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
    bg: "from-blue-400 via-blue-500 to-blue-600",
  },
  {
    name: "Next.js",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    bg: "from-gray-800 via-gray-900 to-black",
  },
  {
    name: "JavaScript",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    bg: "from-yellow-400 via-yellow-500 to-yellow-600",
  },
  {
    name: "Express.js",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    bg: "from-gray-500 via-gray-600 to-gray-700",
  },
  {
    name: "MongoDB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
    bg: "from-green-500 via-green-600 to-green-700",
  },
];
