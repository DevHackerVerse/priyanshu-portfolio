// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import AboutParticles from './AboutParticles';
import { motion } from 'framer-motion';

const About = () => {
  const [activeTab, setActiveTab] = useState('info');
  
  const stats = [
    { number: '4+', label: 'Completed Projects', icon: '📱' },
    { number: '3+', label: 'Certifications', icon: '🏆' },
    { number: '9.72', label: 'CGPA', icon: '🎓' }
  ];

  const skillSections = [
    {
      category: 'Mobile Development',
      icon: '📱',
      skills: ['Android SDK', 'Jetpack', 'XML UI', 'Firebase', 'Appwrite']
    },
    {
      category: 'Programming',
      icon: '💻',
      skills: ['Java', 'Kotlin', 'Python', 'C++', 'C', 'RESTful APIs']
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: ['Spring Boot', 'MySQL', 'Firebase', 'API Design']
    },
    {
      category: 'Tools',
      icon: '🛠️',
      skills: ['Android Studio', 'IntelliJ IDEA', 'VS Code', 'Git', 'GitHub']
    }
  ];

  useEffect(() => {
    const resizeParticles = () => {
      const aboutSection = document.getElementById('about');
      const particlesContainer = document.getElementById('particles-container');

      if (aboutSection && particlesContainer) {
        particlesContainer.style.height = `${aboutSection.offsetHeight}px`;
      }
    };

    resizeParticles();
    window.addEventListener('resize', resizeParticles);
    return () => window.removeEventListener('resize', resizeParticles);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="about" className="relative py-24 text-light overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>

      {/* Particles */}
      <div
        id="particles-container"
        className="absolute top-0 left-0 w-full"
        style={{ zIndex: 1 }}
      >
        <AboutParticles />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
        >
          About Me
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-800 bg-opacity-50 p-1 rounded-full backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab('info')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'info' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'skills' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Skills
            </button>
          </div>
        </div>

        {/* Info section */}
        {activeTab === 'info' && (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-16"
          >
            <motion.div 
              variants={item}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-12 border border-gray-700"
            >
              <h3 className="text-3xl font-bold mb-6 text-primary">Android & Java Developer</h3>
              <motion.p variants={item} className="text-gray-300 mb-6 leading-relaxed text-lg">
                I'm a Computer Engineering student at Bharati Vidyapeeth (DU) College of Engineering, Pune, specializing in Android application development using Java and Kotlin.
              </motion.p>
              <motion.p variants={item} className="text-gray-300 mb-6 leading-relaxed text-lg">
                I'm passionate about creating efficient, user-friendly mobile applications with clean architecture and modern development practices. My experience ranges from Android UI development to backend integration with Spring Boot.
              </motion.p>
              <motion.p variants={item} className="text-gray-300 mb-4 leading-relaxed text-lg">
                Currently, I'm focusing on expanding my knowledge in advanced Android concepts and pursuing opportunities to apply my skills in real-world projects.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={container}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  className="text-center px-6 py-8 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 hover:border-primary transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-3">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="space-y-12">
              {skillSections.map((section, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700"
                >
                  <div className="flex items-center mb-6">
                    <span className="text-3xl mr-3">{section.icon}</span>
                    <h4 className="text-2xl font-bold text-primary">{section.category}</h4>
                  </div>
                  <motion.div 
                    variants={container}
                    className="flex flex-wrap gap-4"
                  >
                    {section.skills.map((skill, i) => {
                      const skillLower = skill.toLowerCase().replace(/ /g, '-');
                      const iconPath = `/images/icons/${skillLower}.png`;
                      return (
                        <motion.div
                          key={i}
                          variants={item}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gray-700 hover:bg-gray-600 hover:border-primary transition-all duration-300 px-4 py-3 rounded-xl flex items-center border border-gray-600 shadow-md"
                        >
                          <div className="w-7 h-7 mr-3 flex items-center justify-center">
                            <img
                              src={iconPath}
                              alt={skill}
                              className="max-w-full max-h-full"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentNode.innerHTML = `<div class='w-7 h-7 rounded-full bg-primary bg-opacity-30 flex items-center justify-center'>
                                  <span class='text-primary text-xs font-bold'>${skill[0]}</span>
                                </div>`;
                              }}
                            />
                          </div>
                          <span className="text-white font-medium">{skill}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
