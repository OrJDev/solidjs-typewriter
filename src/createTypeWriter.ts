import { exec, State, IActionType, Action } from "./utils";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

export interface TypewriterProps {
  onLoopDone?: () => void;
  onType?: (counter: number) => void;
  words: string[];
  loop?: number | boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}

export const createTypeWriter = ({
  words,
  loop = 1,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
  onLoopDone,
  onType,
}: TypewriterProps): Accessor<State> => {
  const [currentState, setCurrentState] = createSignal<State>({
    isDeleting: false,
    speed: typeSpeed,
    text: "",
    count: 0,
  });
  const loops = { current: 0 };
  const isDone = { current: false };

  const dispatch = <K extends IActionType>(action: Action<K>) => {
    const newState = exec(currentState(), action);
    setCurrentState(newState);
  };

  const handleTyping = () => {
    const state = currentState();
    const index = state.count % words.length;
    const fullWord = words[index];
    if (!state.isDeleting) {
      dispatch({ type: "TYPE", payload: fullWord, speed: typeSpeed });
      if (onType) onType(state.count);
      if (state.text === fullWord) {
        dispatch({ type: "SPEED", payload: delaySpeed });
        if (loop > 0) {
          loops.current += 1;
          if (loops.current / words.length === loop) isDone.current = true;
        }
      }
    } else {
      dispatch({ type: "DELETE", payload: fullWord, speed: deleteSpeed });
      if (state.text === "") dispatch({ type: "COUNT" });
    }
  };

  createEffect(() => {
    const typing = setTimeout(handleTyping, currentState().speed);
    if (isDone.current) {
      clearTimeout(typing);
      if (onLoopDone) onLoopDone();
    }
    onCleanup(() => clearTimeout(typing));
  });
  return currentState;
};
