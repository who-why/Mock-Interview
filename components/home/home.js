"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../public/images/boy.webp";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-6 md:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Container with Glassmorphism Effect */}
      <motion.div
        className="w-full max-w-6xl p-8 md:p-12 flex flex-col md:flex-row gap-5 items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Left Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Software Engineer <span className="text-blue-600">Interview</span>{" "}
            Mock
          </motion.h1>
          <motion.p
            className="text-lg font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Ace your technical interviews with our AI-powered mock interview
            platform designed specifically for software developers.
          </motion.p>
          <motion.div
            className="flex items-center gap-5 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          >
            <Link href="/skill">
              <motion.button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Get started →
              </motion.button>
            </Link>
            <Link href="/mock">
              <motion.button
                className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Mock 1:1 →
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
          >
            <Image
              src={HeroImage}
              alt="Hero Section Image"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
