import React from "react";
import { animated, useSpring } from "react-spring";

import styles from "./notfound.module.scss";

import { Particle } from "components/particle/particle";
import { Button } from "react-bootstrap";

const NotFound = () => {
  const fof = "404";
  const message = "Oops, you're looking for something that is not here!";

  const Animation = (i: number) =>
    useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: Math.random() * 3000,
    });

  return (
    <div className={styles.notfound}>
      <Particle />
      <div className={styles.textCenter}>
        <p>
          {fof.split("").map((letter, i) => (
            <animated.span key={i} style={Animation(i)}>
              {letter}
            </animated.span>
          ))}
        </p>
        <p>
          {message.split("").map((letter, i) => (
            <animated.span key={i + 4} style={Animation(i)}>
              {letter}
            </animated.span>
          ))}
        </p>
        <a href="/">
          <Button> Go back </Button>
        </a>
        
      </div>
    </div>
  );
};

export default NotFound;
