export const TUTORIAL_DIMENSIONS = Object.freeze([
  Object.freeze({ key: "expected_task_effectiveness", label: "Task Effectiveness" }),
  Object.freeze({ key: "embodied_feasibility", label: "Embodied Feasibility" }),
  Object.freeze({ key: "functional_creativity", label: "Functional Creativity" }),
]);

export const TUTORIAL_EXAMPLE = Object.freeze({
  id: "tutorial-example",
  displayOnly: true,
  imagePath: "./tutorial-example.svg",
  imageAlt:
    "Illustrated robot arm beside a blue foam block, a movable board, and a green target tray on a table",
  task: "Move the blue foam block into the green target tray.",
  strategies: Object.freeze([
    Object.freeze({
      label: "A",
      text: "Grasp the block and place it directly into the target tray.",
      ratings: Object.freeze({
        expected_task_effectiveness: 5,
        embodied_feasibility: 5,
        functional_creativity: 1,
      }),
      reasoning:
        "Direct and likely to succeed, so effectiveness and feasibility are high, while the approach is not especially novel.",
    }),
    Object.freeze({
      label: "B",
      text: "Place the visible board as a ramp and guide the block down it into the tray.",
      ratings: Object.freeze({
        expected_task_effectiveness: 4,
        embodied_feasibility: 4,
        functional_creativity: 4,
      }),
      reasoning:
        "Uses an available object in a useful, non-obvious way while remaining practical, so all three ratings are relatively high.",
    }),
    Object.freeze({
      label: "C",
      text: "Lift one edge of the removable table insert so the block slides toward the tray.",
      ratings: Object.freeze({
        expected_task_effectiveness: 3,
        embodied_feasibility: 2,
        functional_creativity: 5,
      }),
      reasoning:
        "Makes unusual use of the environment, but controlling the slide may be difficult; creativity can be high while feasibility is lower.",
    }),
    Object.freeze({
      label: "D",
      text: "Push the block away from the tray, then try to toss it into the target.",
      ratings: Object.freeze({
        expected_task_effectiveness: 1,
        embodied_feasibility: 2,
        functional_creativity: 2,
      }),
      reasoning:
        "Is unlikely to accomplish the task reliably, resulting in lower effectiveness and feasibility ratings.",
    }),
  ]),
});
