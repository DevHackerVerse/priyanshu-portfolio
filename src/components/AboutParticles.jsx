// src/components/AboutParticles.jsx
import React from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const AboutParticles = () => {
  const particlesInit = async (engine) => {
    // Use loadSlim instead of loadFull to avoid compatibility issues
    await loadSlim(engine);
  };

  return (
    <Particles
      id="aboutParticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              }
            },
          },
        },
        particles: {
          color: {
            value: "#ff4c29",
          },
          links: {
            color: "#ff4c29",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1
      }}
    />
  );
};

export default AboutParticles;