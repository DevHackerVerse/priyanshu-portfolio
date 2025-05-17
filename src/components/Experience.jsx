// src/components/Experience.jsx
import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Android Developer Intern',
      company: 'Academix Store',
      location: 'Remote',
      period: 'Feb 2025 - May 2025',
      description: [
        'Developed and optimized Android applications following industry best practices.',
        'Collaborated with experienced developers to improve app performance and user experience.'
      ]
    }
  ];

  const education = {
    degree: 'B.Tech in Computer Engineering',
    institution: 'Bharati Vidyapeeth (DU) College of Engineering Pune',
    location: 'Pune',
    period: 'Expected June 2027',
    gpa: '9.72 CGPA',
    courses: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Database Management Systems',
      'Software Engineering'
    ]
  };

  const certifications = [
    {
      title: 'Data Structure & Algorithm using Java',
      issuer: 'NPTEL',
      url: 'https://drive.google.com/file/d/12fEMI_mIa_-hu-ahD7OMw226uSuy0DtI/view?usp=drive_link/'
    },
    {
      title: 'Data Base Management System',
      issuer: 'NPTEL',
      url: 'https://drive.google.com/file/d/1bZCV-KUlnQKOaQbav2QDAiUdR5p3C5Va/view?usp=sharing/'
    },
    {
      title: 'Postman API Fundamentals Student Expert',
      issuer: 'Postman',
      url: 'https://api.badgr.io/public/assertions/hZEnC0DsT6qzE87A9x45Tg'
    }
  ];

  const achievements = [
    'Shortlisted for Smart India Hackathon 2024 (SIH24)',
    'Outreach Lead at GeeksForGeeks Student Chapter',
    'Android Lead at Google Developers Group'
  ];

  return (
    <section id="experience" className="py-20 bg-dark text-light">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Experience & Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Professional Experience */}
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-primary bg-opacity-10 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Professional Experience</h3>
              </div>
              
              {experiences.map((exp, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 mb-6 relative ml-8 border-l-2 border-primary pl-10">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold">{exp.title}</h4>
                    <span className="text-primary text-sm bg-primary bg-opacity-10 px-3 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <div className="text-gray-400 mb-4">{exp.company} • {exp.location}</div>
                  <ul className="list-disc pl-4 space-y-2 text-gray-300">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Achievements */}
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-primary bg-opacity-10 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Achievements</h3>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 ml-8">
                <ul className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center">
                      <div className="text-primary mr-3">•</div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-primary bg-opacity-10 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 ml-8">
                <h4 className="text-xl font-bold mb-2">{education.degree}</h4>
                <p className="text-primary mb-1">{education.institution}</p>
                <div className="flex items-center mb-4">
                  <span className="text-gray-400">{education.period}</span>
                  <span className="mx-2">•</span>
                  <span className="inline-block bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-md text-sm">
                    {education.gpa}
                  </span>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-semibold mb-3">Relevant Courses:</h5>
                  <div className="flex flex-wrap gap-2">
                    {education.courses.map((course, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-primary bg-opacity-10 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Certifications</h3>
              </div>
              
              <div className="space-y-4 ml-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-5 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{cert.title}</h4>
                        <span className="text-gray-400 text-sm">{cert.issuer}</span>
                      </div>
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-lg flex items-center hover:bg-opacity-20 transition-all"
                      >
                        View Credential
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;