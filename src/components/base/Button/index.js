import React from "react";
import styles from "./button.module.css";
const Button = ({ title, bgColor, textColor, border, src, alt }) => {
  return (
    <div>
      <button
        className={styles.button}
        style={{ backgroundColor: bgColor, color: textColor, border: border }}
      >
        <img src={src} alt={alt} className={styles.image}/> {title}
      </button>
    </div>
  );
};

export default Button;
