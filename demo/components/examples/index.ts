export { DefaultDemo } from "./default-demo";
export { CluelyDemo } from "./cluely-demo";

export const demoExamples = {
  default: {
    name: "Default",
  },
  cluely: {
    name: "Cluely",
  },
} as const;

export type DemoExampleKey = keyof typeof demoExamples;

