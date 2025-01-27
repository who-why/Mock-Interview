import React from "react";
import Image from "next/image";
import Boy from "../../public/images/boy.webp";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center mt-10 px-4 md:px-16">
      {/* Left Section */}
      <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center items-center md:items-start space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Connect with Industry Experts for{" "}
          <span className="text-purple-600">Personal Growth</span>
        </h1>
        <p className="text-lg text-pink-600">
          Boost your confidence and land your dream job with our AI-powered
          practice platform.
        </p>
        <div className="flex space-x-4">
          <Link href={`/skill`}>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-400 transition">
              Get Started
            </button>
          </Link>
          <button className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-400 transition">
            1:1 Discussion
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <Image
          src={Boy}
          alt="boy"
          className="object-contain w-full max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
};

export default Home;
