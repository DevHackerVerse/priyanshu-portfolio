// src/components/ResumeModal.jsx
import React from 'react';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 bg-black bg-opacity-30 z-50 flex justify-center items-center p-4">

      <div className="bg-transparent rounded-lg max-w-3xl w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white hover:text-red-500 text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Resume Preview */}
        <div className="mb-4 h-[500px] overflow-hidden">
          <iframe
            src="/resume/priyanshu_resume.pdf"
            title="Resume"
            className="w-full h-full border-0"
            aria-label="Resume preview"
          />
        </div>

        {/* Download Button */}
        <div className="text-right mt-4">
          <a
            href="/resume/priyanshu_resume.pdf"
            download="Priyanshu_Raj_Resume.pdf"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;