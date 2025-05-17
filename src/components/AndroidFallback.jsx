// src/components/AndroidFallback.jsx
import React from 'react';

const AndroidFallback = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg">
      <div className="relative w-48 h-64 mb-6">
        {/* Android head */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-14 bg-green-500 rounded-t-full"></div>
        
        {/* Android body */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-36 h-32 bg-green-500 rounded-md"></div>
        
        {/* Android arms */}
        <div className="absolute top-20 left-0 w-6 h-20 bg-green-500 rounded-full"></div>
        <div className="absolute top-20 right-0 w-6 h-20 bg-green-500 rounded-full"></div>
        
        {/* Android legs */}
        <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 w-6 h-16 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 transform translate-x-1/2 w-6 h-16 bg-green-500 rounded-full"></div>
        
        {/* Android eyes */}
        <div className="absolute top-6 left-1/3 w-4 h-4 bg-gray-900 rounded-full"></div>
        <div className="absolute top-6 right-1/3 w-4 h-4 bg-gray-900 rounded-full"></div>
        
        {/* Android antennas */}
        <div className="absolute top-0 left-1/3 w-1 h-4 bg-green-500 transform -translate-y-3/4"></div>
        <div className="absolute top-0 right-1/3 w-1 h-4 bg-green-500 transform -translate-y-3/4"></div>
      </div>
      
      <h3 className="text-xl font-bold text-green-500 mb-4">Android Developer</h3>
      
      <div className="text-center text-gray-300">
        <p className="mb-2">• Java & Kotlin</p>
        <p className="mb-2">• Mobile UI/UX</p>
        <p className="mb-2">• Android SDK & Jetpack</p>
        <p>• Spring Boot Integration</p>
      </div>
    </div>
  );
};

export default AndroidFallback;