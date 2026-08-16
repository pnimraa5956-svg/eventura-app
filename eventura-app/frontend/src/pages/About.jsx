import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-[88vh] bg-[#0b0f19] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-900/60 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm">
          {/* Profile Picture Placeholder */}
          <div className="relative group shrink-0">
            <div className="w-40 h-40 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-xl shadow-blue-500/10">
              <img
                src="/Photo project.jpg"
                alt="Patan Nimraa Firdos"
                className="w-full h-full object-cover rounded-xl bg-gray-800"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full border-2 border-gray-900">
              CS Student
            </span>
          </div>

          {/* Intro Details */}
          <div className="space-y-3 text-center md:text-left">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              About The Developer
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Patan Nimraa Firdos
            </h1>
            <p className="text-gray-400 font-medium text-base">
              Computer Science Student & Full-Stack Web Developer
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
              <a
                href="mailto:pnimraa5956@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700/80 border border-gray-700/80 rounded-xl text-sm text-gray-200 transition-all"
              >
                <span>✉️</span> pnimraa5956@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-gray-900/40 border border-gray-800/80 p-8 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">🚀</span> Professional Biography
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            I am a passionate Computer Science student dedicated to crafting clean, high-performance, and visually intuitive web applications. With a strong foundation in modern software development and full-stack architecture, I thrive on turning ideas into seamless interactive experiences.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Driven by curiosity and technical precision, I continuously refine my skills in modern frontend frameworks, database management, and responsive user interfaces to build robust solutions that deliver real user value.
          </p>
        </div>

        {/* Tech Stack & Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">⚡</span> Technical Expertise
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Node.js', 'Full-Stack Development', 'DBMS', 'HTML5/CSS3'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-800/80 border border-gray-700/60 rounded-lg text-xs font-medium text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">🌟</span> Featured Work
            </h3>
            <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <h4 className="font-semibold text-white text-sm">Eventura — Event Platform</h4>
              <p className="text-xs text-gray-400 mt-1">
                A modern full-stack event discovery, booking, and hosting platform engineered with React and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;