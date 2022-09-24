/*@refresh skip*/

import { TypewriterProps, createTypeWriter } from "./createTypeWriter";
import { Component } from "solid-js";
import styles from "./styles.module.css";

interface ITypeWriterProps extends TypewriterProps {
  cursor?: boolean;
  cursorStyle?: string;
  cursorColor?: string;
}

export const Typewriter: Component<ITypeWriterProps> = ({
  words,
  loop = 1,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
  cursor = false,
  cursorStyle = "|",
  cursorColor = "inherit",
  onLoopDone,
  onType,
}) => {
  const currentState = createTypeWriter({
    words,
    loop,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
    onLoopDone,
    onType,
  });

  return (
    <>
      <span>{currentState().text}</span>
      {cursor && <Cursor cursorStyle={cursorStyle} cursorColor={cursorColor} />}
    </>
  );
};

interface ICursorProps {
  cursorStyle?: string;
  cursorColor?: string;
}

export const Cursor: Component<ICursorProps> = ({
  cursorStyle = "|",
  cursorColor = "inherit",
}) => {
  return (
    <span style={{ color: cursorColor }} class={styles.blinkingCursor}>
      {cursorStyle}
    </span>
  );
};
