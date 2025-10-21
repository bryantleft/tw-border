export const examples = {
  cluely: {
    name: "Cluely",
    description: "Cluely's chat input in invisible mode",
    logo: "/logos/cluely.jpeg",
  },
} as const;

export const examplesArray = Object.entries(examples).map(([slug, data]) => ({
  slug,
  ...data,
}));

