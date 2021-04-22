import Particles from "react-particles-js";
import styles from "./particle.module.scss";
import React from 'react'

export const Particle = () => {
    return (
        <>
            <Particles className={styles.wrapper}/>
        </>
    )
}
