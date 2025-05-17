// src/components/Projects.jsx - Enhanced design with primary color
import React from 'react';
import FloatingCard from './FloatingCard';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Mess Management System",
      description: "Mobile app for users and website for mess management using MySQL as the database.",
      technologies: [
        { name: "Java", icon: "/priyanshu-portfolio/images/icons/java.png" },
        { name: "SpringBoot", icon: "/priyanshu-portfolio/images/icons/spring-boot.png" },
        { name: "React", icon: "/priyanshu-portfolio/images/icons/react.png" },
        { name: "MySQL", icon: "/priyanshu-portfolio/images/icons/mysql.png" },
        { name: "Kotlin", icon: "/priyanshu-portfolio/images/icons/kotlin.png" },
        { name: "XML", icon: "/priyanshu-portfolio/images/icons/xml.png" }
      ],
      image: `/images/projects/mess-management.jpg`, 
      github: "https://github.com/DevHackerVerse/MessManagement"
    },
    {
      id: 2,
      title: "Mentor-Mentee App",
      description: "Two-part application for faculty to track student progress and for students to view academic records.",
      technologies: [
        { name: "Kotlin", icon: "/priyanshu-portfolio/images/icons/kotlin.png" },
        { name: "XML", icon: "/priyanshu-portfolio/images/icons/xml.png" },
        { name: "Appwrite", icon: "/priyanshu-portfolio/images/icons/appwrite.png" }
      ],
      image: `/images/projects/mentor-mentee.jpg`,
      github: "https://github.com/manishkumar0002/YumXpress"
    },
    {
      id: 3,
      title: "Mess Management System",
      description: "Mobile app for users and website for mess management using MySQL as the database.",
      technologies: [
        { name: "Java", icon: "/priyanshu-portfolio/images/icons/java.png" },
        { name: "SpringBoot", icon: "/priyanshu-portfolio/images/icons/spring-boot.png" },
        { name: "React", icon: "/priyanshu-portfolio/images/icons/react.png" },
        { name: "MySQL", icon: "/priyanshu-portfolio/images/icons/mysql.png" },
        { name: "Kotlin", icon: "/priyanshu-portfolio/images/icons/kotlin.png" },
        { name: "XML", icon: "/priyanshu-portfolio/images/icons/xml.png" }
      ],
      image: `/images/projects/mess-management.jpg`, 
      github: "https://github.com/DevHackerVerse/project-repo"
    }
  ];

  return (
    <section className="py-20 bg-dark text-light" id="projects">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {projects.map(project => (
            <FloatingCard key={project.id}>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl h-full border border-gray-700 hover:border-[#FF4C29]/30 transition-colors duration-300">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C29]/20 to-transparent z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <div 
                        key={tech.name} 
                        className="flex items-center bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700 hover:border-[#FF4C29]/40 hover:bg-gray-700/70 transition-all duration-200"
                      >
                        <span className="text-xs font-medium inline-flex items-center">
                          <img 
                            src={tech.icon} 
                            alt={tech.name}
                            className="w-3.5 h-3.5 mr-1.5"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block w-full text-center bg-gradient-to-r from-[#FF4C29] to-[#F8333C] text-white px-6 py-3 rounded-lg font-medium tracking-wide hover:bg-gradient-to-br hover:from-[#FF5E3B] hover:via-[#FF4C29] hover:to-[#E62D36] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-[0_8px_20px_-6px_rgba(255,76,41,0.6)] border border-[#FF4C29]/20"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;