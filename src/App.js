// Install dependencies
// npm install scrollreveal react-tsparticles tsparticles-slim tsparticles three

// src/App.js
import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from 'scrollreveal';

function App() {
  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });

    // Apply to sections
    sr.reveal('#about .container > h2', {});
    sr.reveal('#about .grid > div:first-child', { delay: 300 });
    sr.reveal('#about .grid > div:last-child', { delay: 400 });
    
    sr.reveal('#projects .container > h2', {});
    sr.reveal('#projects .grid > div', { interval: 200 });
    
    sr.reveal('#experience .container > h2', {});
    sr.reveal('#experience .grid > div:first-child', { delay: 300 });
    sr.reveal('#experience .grid > div:last-child', { delay: 400 });
    
    sr.reveal('#contact .container > h2', {});
    sr.reveal('#contact .grid > div:first-child', { delay: 300 });
    sr.reveal('#contact .grid > div:last-child', { delay: 400 });
    
  }, []);

  return (
    <div className="App">
      <Navigation />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;