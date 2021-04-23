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

  const buttonAnimation = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
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
        <animated.span style={buttonAnimation}>
          <a href="/">
            <Button className={styles.notFoundButton}> Go back </Button>
          </a>
        </animated.span>
      </div>
    </div>
  );
};

export default NotFound;
