"use client";

import { TypeAnimation } from "react-type-animation";
import { AnimatedTextProps } from "../constants/interfaces";


export const AnimatedTextHeader: React.FC<AnimatedTextProps> = ({
  messages,
  color = "#387478",
  delays = [1000, 1000],
}) => {
  const sequence = messages.flatMap((msg, index) => [
    msg,
    delays[index % delays.length],
  ]);
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={20}
      style={{
        fontSize: "clamp(2.3rem, 5vw, 3rem)",
        display: "inline",
        fontWeight: "bold",
        width: "100%",
        color,
        textWrap: "nowrap",
        // fontFamily: "Chewy",
      }}
      repeat={Infinity}
    />
  );
};