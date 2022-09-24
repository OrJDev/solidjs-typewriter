export type State = {
  speed: number;
  text: string;
  isDeleting: boolean;
  count: number;
};

export type IActionType = "SPEED" | "TYPE" | "DELETE" | "COUNT";
export type Action<T extends IActionType> = (T extends "SPEED"
  ? { payload: number }
  : T extends "TYPE" | "DELETE"
  ? { speed: number; payload: string }
  : {}) & { type: T };

const actionIsType = <K extends IActionType>(
  action: Action<IActionType>,
  type: K
): action is Action<K> => action.type === type;

export function exec<K extends IActionType>(
  state: State,
  action: Action<K>
): State {
  if (actionIsType(action, "SPEED")) {
    return {
      ...state,
      isDeleting: true,
      speed: action.payload,
    };
  } else if (actionIsType(action, "TYPE")) {
    return {
      ...state,
      speed: action.speed,
      text: action.payload?.substring(0, state.text.length + 1),
    };
  } else if (actionIsType(action, "DELETE")) {
    return {
      ...state,
      speed: action.speed,
      text: action.payload?.substring(0, state.text.length - 1),
    };
  } else if (actionIsType(action, "COUNT")) {
    return {
      ...state,
      isDeleting: false,
      count: state.count + 1,
    };
  } else {
    return state;
  }
}
