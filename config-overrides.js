const path = require('path');

module.exports = function override(config) {
  // Add this rule to handle the MediaPipe source map issue
  config.module.rules.push({
    test: /node_modules[\\/]@mediapipe[\\/]tasks-vision[\\/]/,
    use: {
      loader: 'source-map-loader',
      options: {
        filterSourceMappingUrl: (url, resourcePath) => {
          // Ignore missing source maps for MediaPipe
          if (resourcePath.includes('@mediapipe/tasks-vision')) {
            return false;
          }
          return true;
        }
      }
    }
  });
  
  return config;
};