// src/components/Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import ResumeModal from './ResumeModal';

const Hero = () => {
  const typewriterRef = useRef(null);
  const cursorRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonHover, setButtonHover] = useState(null);
  const [greeting, setGreeting] = useState('Hallo, Guten Morgen');

  useEffect(() => {
    // Mark component as loaded with slight delay for entrance animation
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    
    // Set the greeting based on the time of day
    const updateGreeting = () => {
      const hour = new Date().getHours();
      // German time-appropriate greetings
      if (hour >= 5 && hour < 12) {
        setGreeting('Hallo, Guten Morgen'); // Good morning (5am-12pm)
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Hallo, Guten Tag'); // Good day/afternoon (12pm-6pm)
      } else if (hour >= 18 && hour < 20) {
        setGreeting('Hallo, Guten Abend'); // Good evening (6pm-10pm)
      } else {
        setGreeting('Hallo, Gute Nacht'); // Good night (10pm-5am)
      }
    };
    
    // Initial greeting update
    updateGreeting();
    
    // Update greeting every minute
    const greetingInterval = setInterval(updateGreeting, 60000);
    
    // Only run typewriter in browser
    if (typeof window !== 'undefined') {
      // Import Typewriter dynamically to avoid SSR issues
      import('typewriter-effect/dist/core').then(({ default: Typewriter }) => {
        // Clear previous instances
        if (typewriterRef.current) {
          typewriterRef.current = null;
        }
        
        // Initialize new typewriter with improved strings
        if (document.querySelector('.typewriter-text')) {
          typewriterRef.current = new Typewriter(document.querySelector('.typewriter-text'), {
            strings: [
              'Android App Developer', 
              'Java & Kotlin Expert', 
              'UI/UX Enthusiast',
              'Problem Solver'
            ],
            autoStart: true,
            loop: true,
            delay: 70,
            deleteSpeed: 50,
            pauseFor: 1500,
            cursor: '',
            wrapperClassName: 'text-primary',
          });
        }
      });
    }
    
    // Add blinking cursor effect
    let cursorVisible = true;
    cursorRef.current = setInterval(() => {
      const cursor = document.querySelector('.typewriter-cursor');
      if (cursor) {
        cursor.style.opacity = cursorVisible ? '1' : '0';
        cursorVisible = !cursorVisible;
      }
    }, 500);
    
    // Cleanup
    return () => {
      clearTimeout(loadTimer);
      clearInterval(greetingInterval);
      if (typewriterRef.current) {
        typewriterRef.current.stop();
      }
      if (cursorRef.current) {
        clearInterval(cursorRef.current);
      }
    };
  }, []);

  // Tech stack with icons instead of initials
  const techStack = [
    { 
      name: 'Java', 
      color: '#f89820',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
    },
    { 
      name: 'Kotlin', 
      color: '#7F52FF',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
    },
    { 
      name: 'Android', 
      color: '#3DDC84',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg'
    },
    { 
      name: 'Spring Boot', 
      color: '#6DB33F',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
    },
    { 
      name: 'Firebase', 
      color: '#FFCA28',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    },
    { 
      name: 'MVVM', 
      color: '#ff4c29',
      // For MVVM we'll use a custom SVG since it's an architecture pattern
      icon: null
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-dark text-light overflow-hidden py-20 md:py-0">
      <ParticleBackground />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-5"></div>
      
      {/* Hero Content */}
      <div className={`container mx-auto px-4 sm:px-6 z-10 relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text content */}
          <div className="w-full md:w-3/5 text-center md:text-left">
            <p className="text-gray-400 mb-2 text-base sm:text-lg tracking-wider font-light">
              <span className="inline-block border-b border-primary pb-1">{greeting}</span>
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
              I'M <span className="text-primary relative inline-block">
                Priyanshu Raj
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center md:justify-start">
              <span className="mr-2">I Am </span>
              <span className="typewriter-text min-h-8"></span>
              <span className="typewriter-cursor text-primary text-2xl sm:text-3xl font-light">|</span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0 text-base sm:text-lg leading-relaxed">
              Building innovative mobile solutions with a focus on clean architecture, 
              performance optimization, and creating seamless user experiences.
            </p>
            
            {/* Improved Button Design */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 mb-20 sm:mb-10">
              <a 
                href="#projects" 
                className="relative overflow-hidden group bg-primary text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-md transition-all duration-300 w-full sm:w-auto"
                onMouseEnter={() => setButtonHover('projects')}
                onMouseLeave={() => setButtonHover(null)}
              >
                <span className={`relative z-10 flex items-center justify-center transition-transform duration-300 ${buttonHover === 'projects' ? 'transform -translate-y-px' : ''}`}>
                  <span>View Projects</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ml-2 transition-transform duration-300 ${buttonHover === 'projects' ? 'translate-x-1' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
              </a>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative overflow-hidden group bg-transparent border border-primary/50 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-md transition-all duration-300 w-full sm:w-auto"
                onMouseEnter={() => setButtonHover('resume')}
                onMouseLeave={() => setButtonHover(null)}
              >
                <span className={`relative z-10 flex items-center justify-center transition-transform duration-300 ${buttonHover === 'resume' ? 'transform -translate-y-px' : ''}`}>
                  <span>Download Resume</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ml-2 transition-transform duration-300 ${buttonHover === 'resume' ? 'translate-y-1' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/30 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              {[
                { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', url: 'https://github.com/DevHackerVerse' },
                { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', url: 'https://linkedin.com/in/priyanshu-raj-29434a254/' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Tech Stack for mobile only */}
            <div className={`block sm:hidden w-full mb-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-center text-gray-400 text-sm mb-4 uppercase tracking-wider">Tech Stack</p>
              <div className="flex justify-center flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <div 
                    key={index} 
                    className="text-center flex flex-col items-center group"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div 
                      className="h-10 w-10 mb-2 bg-gray-800 rounded-lg flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:shadow-lg"
                      style={{boxShadow: `0 4px 10px ${tech.color}30`}}
                    >
                      {tech.icon ? (
                        <img 
                          src={tech.icon} 
                          alt={tech.name} 
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 5H7V19H3V5Z" fill={tech.color} />
                          <path d="M10 5H14V19H10V5Z" fill={tech.color} />
                          <path d="M17 5H21V19H17V5Z" fill={tech.color} />
                          <path d="M2 12H22" stroke={tech.color} strokeWidth="2" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs font-medium uppercase text-gray-400 group-hover:text-primary transition-colors">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Profile Image Section */}
          <div className="hidden md:flex w-full md:w-2/5 justify-center items-center mt-8 md:mt-0">
            <div className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] flex items-center justify-center">
              {/* Radial gradient background */}
              <div className="absolute inset-0 rounded-full" style={{
                background: 'radial-gradient(circle at 50% 40%, #ff5e3a33 0%, #1a1a1a 80%)',
                zIndex: 1
              }}></div>
              
              {/* Large colored circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-[#ff5e3a] opacity-70 h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] z-10"></div>
              
              {/* Left bracket */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
                <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="60" fontSize="60" fill="#ff5e3a55" fontFamily="monospace" fontWeight="bold" >&lt;</text>
                </svg>
              </div>
              
              {/* Right bracket */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
                <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="60" fontSize="60" fill="#ff5e3a55" fontFamily="monospace" fontWeight="bold" >&gt;</text>
                </svg>
              </div>
              
              {/* Profile image */}
              <img 
                src="/priyanshu-portfolio/images/priyanshu-1.png" 
                alt="Priyanshu Raj" 
                className="relative z-30 h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] object-cover rounded-xl shadow-xl"
                style={{objectPosition: 'top'}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className={`hidden sm:block absolute bottom-20 left-0 right-0 z-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-10 sm:mt-0`}>
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm mb-4 uppercase tracking-wider">Tech Stack</p>
          <div className="flex justify-center flex-wrap gap-3 sm:gap-6 md:gap-8">
            {techStack.map((tech, index) => (
              <div 
                key={index} 
                className="text-center flex flex-col items-center group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div 
                  className="h-10 w-10 sm:h-16 sm:w-16 mb-2 bg-gray-800 rounded-lg flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:shadow-lg"
                  style={{boxShadow: `0 4px 10px ${tech.color}30`}}
                >
                  {tech.icon ? (
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="h-6 w-6 sm:h-10 sm:w-10 object-contain"
                    />
                  ) : (
                    <svg className="h-6 w-6 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5H7V19H3V5Z" fill={tech.color} />
                      <path d="M10 5H14V19H10V5Z" fill={tech.color} />
                      <path d="M17 5H21V19H17V5Z" fill={tech.color} />
                      <path d="M2 12H22" stroke={tech.color} strokeWidth="2" />
                    </svg>
                  )}
                </div>
                <p className="text-xs font-medium uppercase text-gray-400 group-hover:text-primary transition-colors">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce mb-4 sm:mb-0">
        <div className="text-gray-400 flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
          <span className="text-xs uppercase tracking-wider mb-1">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;