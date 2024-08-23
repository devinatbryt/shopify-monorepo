export type Position = (typeof POSITION)[keyof typeof POSITION];
export type Action = (typeof ACTION)[keyof typeof ACTION];

export const POSITION = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
} as const;

export const ACTION = {
  OPEN: "open",
  CLOSE: "close",
  TOGGLE: "toggle",
};

export const EVENT_NAMESPACE = `bryt:drawer` as const;
