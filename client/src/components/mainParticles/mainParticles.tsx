import Particles from "react-particles-js";
import styles from "./mainParticles.module.scss";
import React from "react";

const mainParticles = () => {
  return (
    <Particles
      className={styles.wrapper}
      params={{
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          line_linked: {
            enable: true,
            opacity: 0.02,
          },
          move: {
            speed: 0.05,
          },
          size: {
            value: 1.3,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};
export default mainParticles;
