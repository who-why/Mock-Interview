"use client";

import React, { useContext, useState } from "react";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaPython,
  FaJava,
  FaCss3,
} from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiMongodb } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import Link from "next/link";
import { MyContext } from "@/context/context";
import { useRouter } from "next/navigation";

const page = () => {
  const [selectedSkill, setselectedSkill] = useState();
  const { selectedSkillName, setSelectedSkillName } = useContext(MyContext);

  const toggleSkill = (index, name) => {
    if (selectedSkill === index) {
      setselectedSkill(null);
      setSelectedSkillName("");
    } else {
      setselectedSkill(index);
      setSelectedSkillName(name);
    }
  };
  const router = useRouter();

  const handleNextClick = () => {
    if (selectedSkillName) {
      router.push("/question");
    } else {
      alert("Please select a skill before proceeding.");
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
            className={`relative flex flex-col items-center justify-center cursor-pointer w-36 h-36 bg-gradient-to-r ${
              skill.bg
            } rounded-lg shadow-lg p-4 border-2 transition-all duration-300 ${
              selectedSkill === index
                ? "border-green-500"
                : "border-transparent"
            }`}
          >
            {skill.icon}
            {selectedSkill === index && (
              <>
                <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 text-white flex items-center justify-center rounded-full">
                  ✓
                </div>
                <p className="mt-2 text-white font-semibold">
                  {selectedSkillName}
                </p>
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
        <button
          onClick={handleNextClick}
          className="py-3 px-8 bg-gray-600 text-white rounded-md hover:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default page;

const skills = [
  {
    name: "React.js",
    icon: <FaReact className="w-16 h-16 text-white" />,
    bg: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    name: "Vue.js",
    icon: <FaVuejs className="w-16 h-16 text-white" />,
    bg: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    name: "Angular",
    icon: <FaAngular className="w-16 h-16 text-white" />,
    bg: "from-green-400 via-yellow-400 to-red-500",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="w-16 h-16 text-white" />,
    bg: "from-gray-700 via-gray-900 to-black",
  },
  {
    name: "Python",
    icon: <FaPython className="w-16 h-16 text-white" />,
    bg: "from-red-600 via-red-800 to-gray-900",
  },
  {
    name: "Java",
    icon: <FaJava className="w-16 h-16 text-white" />,
    bg: "from-blue-700 via-blue-800 to-blue-900",
  },
  {
    name: "CSS",
    icon: <FaCss3 className="w-16 h-16 text-white" />,
    bg: "from-blue-400 via-blue-500 to-blue-600",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="w-16 h-16 text-white" />,
    bg: "from-gray-800 via-gray-900 to-black",
  },
  {
    name: "JavaScript",
    icon: <IoLogoJavascript className="w-16 h-16 text-white" />,
    bg: "from-yellow-400 via-yellow-500 to-yellow-600",
  },
  {
    name: "Express.js",
    icon: <SiExpress className="w-16 h-16 text-white" />,
    bg: "from-gray-500 via-gray-600 to-gray-700",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="w-16 h-16 text-white" />,
    bg: "from-green-500 via-green-600 to-green-700",
  },
];
