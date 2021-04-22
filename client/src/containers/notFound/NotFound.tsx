import React from "react";
import { animated, useSpring } from "react-spring";

import styles from "./notfound.module.scss";

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
      <p className="text-center">
        {fof.split("").map((letter, i) => (
          <animated.span key={i} style={Animation(i)}>
            {letter}
          </animated.span>
        ))}
      </p>
      <p className="text-center">
        {message.split("").map((letter, i) => (
          <animated.span key={i + 4} style={Animation(i)}>
            {letter}
          </animated.span>
        ))}
      </p>
    </div>
  );
};

export default NotFound;
