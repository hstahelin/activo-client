export const QUESTIONS = [
  {
    id: "age",
    text: "What is your age?",
    type: "single",
    category: "profile",
    options: [
      {
        id: "age-10",
        label: "Under 20",
        value: 10,
        scoreWeight: 0,
        nextQuestionId: "motivation",
      },
      {
        id: "age-20",
        label: "20s",
        value: 20,
        scoreWeight: 1,
        nextQuestionId: "motivation",
      },
      {
        id: "age-30",
        label: "30s",
        value: 30,
        scoreWeight: 2,
        nextQuestionId: "motivation",
      },
      {
        id: "age-40",
        label: "40s",
        value: 40,
        scoreWeight: 3,
        nextQuestionId: "motivation",
      },
      {
        id: "age-50",
        label: "50+",
        value: 50,
        scoreWeight: 4,
        nextQuestionId: "motivation",
      },
    ],
  },
  {
    id: "motivation",
    text: "What motivates you to exercise?",
    type: "multiple",
    category: "psychology",
    options: [
      {
        id: "motivation-look",
        label: "Look Better",
        value: "look",
        scoreWeight: 2,
        nextQuestionId: "goal",
      },
      {
        id: "motivation-strong",
        label: "Get Stronger",
        value: "strong",
        scoreWeight: 2,
        nextQuestionId: "goal",
      },
      {
        id: "motivation-health",
        label: "Feel Healthier",
        value: "health",
        scoreWeight: 1,
        nextQuestionId: "goal",
      },
      {
        id: "motivation-other",
        label: "Other",
        value: "other",
        scoreWeight: 1,
        nextQuestionId: "goal",
      },
    ],
  },
  {
    id: "goal",
    text: "What are your fitness goals?",
    type: "multiple",
    category: "goal-setting",
    options: [
      {
        id: "goal-muscle",
        label: "Build muscle",
        value: "muscle",
        scoreWeight: 3,
        nextQuestionId: "bodyGoal",
      },
      {
        id: "goal-weight",
        label: "Manage weight",
        value: "weight",
        scoreWeight: 2,
        nextQuestionId: "bodyGoal",
      },
      {
        id: "goal-fat",
        label: "Lose fat",
        value: "fat",
        scoreWeight: 3,
        nextQuestionId: "bodyGoal",
      },
      {
        id: "goal-fitness",
        label: "Improve fitness",
        value: "fitness",
        scoreWeight: 1,
        nextQuestionId: "bodyGoal",
      },
    ],
  },
  {
    id: "bodyGoal",
    text: "What is your ideal body goal?",
    type: "single",
    category: "goal-setting",
    options: [
      {
        id: "goal-smaller",
        label: "Smaller – Slimmer and leaner",
        value: "smaller",
        scoreWeight: 1,
        nextQuestionId: "build",
      },
      {
        id: "goal-athletic",
        label: "Athletic – Toned and fit",
        value: "athletic",
        scoreWeight: 2,
        nextQuestionId: "build",
      },
      {
        id: "goal-shredded",
        label: "Shredded – Defined muscles",
        value: "shredded",
        scoreWeight: 3,
        nextQuestionId: "build",
      },
      {
        id: "goal-swole",
        label: "Swole – Big and muscular",
        value: "swole",
        scoreWeight: 4,
        nextQuestionId: "build",
      },
    ],
  },
  {
    id: "build",
    text: "Which best describes your current build?",
    type: "single",
    category: "physical",
    options: [
      {
        id: "build-slender",
        label: "Slender",
        value: "slender",
        scoreWeight: 1,
        nextQuestionId: "experience",
      },
      {
        id: "build-medium",
        label: "Medium",
        value: "medium",
        scoreWeight: 2,
        nextQuestionId: "experience",
      },
      {
        id: "build-stocky",
        label: "Stocky",
        value: "stocky",
        scoreWeight: 3,
        nextQuestionId: "experience",
      },
      {
        id: "build-overweight",
        label: "Overweight",
        value: "overweight",
        scoreWeight: 4,
        nextQuestionId: "experience",
      },
    ],
  },
  {
    id: "experience",
    text: "What is your experience with fitness?",
    type: "single",
    category: "physical",
    options: [
      {
        id: "exp-struggle",
        label: "Struggle to gain weight/muscle",
        value: "hardgainer",
        scoreWeight: 3,
        nextQuestionId: "bestShape",
      },
      {
        id: "exp-easy",
        label: "Gain and lose easily",
        value: "balanced",
        scoreWeight: 2,
        nextQuestionId: "bestShape",
      },
      {
        id: "exp-gainfast",
        label: "Gain fast, lose slow",
        value: "easygainer",
        scoreWeight: 4,
        nextQuestionId: "bestShape",
      },
    ],
  },
  {
    id: "bestShape",
    text: "When were you in your best shape?",
    type: "single",
    category: "history",
    options: [
      {
        id: "shape-less1",
        label: "Less than 1 year ago",
        value: "<1",
        scoreWeight: 1,
        nextQuestionId: "exerciseExperience",
      },
      {
        id: "shape-1to2",
        label: "1–2 years ago",
        value: "1-2",
        scoreWeight: 2,
        nextQuestionId: "exerciseExperience",
      },
      {
        id: "shape-3plus",
        label: "More than 3 years ago",
        value: ">3",
        scoreWeight: 3,
        nextQuestionId: "exerciseExperience",
      },
      {
        id: "shape-never",
        label: "Never",
        value: "never",
        scoreWeight: 4,
        nextQuestionId: "exerciseExperience",
      },
    ],
  },
  {
    id: "exerciseExperience",
    text: "What’s your fitness experience?",
    type: "single",
    category: "training",
    options: [
      {
        id: "exp-starting",
        label: "Just starting",
        value: "beginner",
        scoreWeight: 1,
        nextQuestionId: "blocks",
      },
      {
        id: "exp-some",
        label: "Some experience",
        value: "intermediate",
        scoreWeight: 2,
        nextQuestionId: "blocks",
      },
      {
        id: "exp-advanced",
        label: "Experienced",
        value: "advanced",
        scoreWeight: 3,
        nextQuestionId: "blocks",
      },
    ],
  },
  {
    id: "blocks",
    text: "What challenges hold you back from exercising?",
    type: "multiple",
    category: "psychology",
    options: [
      {
        id: "block-motivation",
        label: "Motivation",
        value: "motivation",
        scoreWeight: 2,
        nextQuestionId: "flexibility",
      },
      {
        id: "block-plan",
        label: "No plan",
        value: "plan",
        scoreWeight: 2,
        nextQuestionId: "flexibility",
      },
      {
        id: "block-time",
        label: "Time",
        value: "time",
        scoreWeight: 2,
        nextQuestionId: "flexibility",
      },
      {
        id: "block-pain",
        label: "Pain or injuries",
        value: "pain",
        scoreWeight: 3,
        nextQuestionId: "flexibility",
      },
      {
        id: "block-none",
        label: "None",
        value: "none",
        scoreWeight: 0,
        nextQuestionId: "flexibility",
      },
      {
        id: "block-other",
        label: "Other",
        value: "other",
        scoreWeight: 1,
        nextQuestionId: "flexibility",
      },
    ],
  },
  {
    id: "flexibility",
    text: "How flexible are you?",
    type: "single",
    category: "physical",
    options: [
      {
        id: "flex-very",
        label: "Very flexible",
        value: "very",
        scoreWeight: 1,
        nextQuestionId: "zones",
      },
      {
        id: "flex-medium",
        label: "Moderately",
        value: "medium",
        scoreWeight: 2,
        nextQuestionId: "zones",
      },
      {
        id: "flex-none",
        label: "Not flexible",
        value: "none",
        scoreWeight: 3,
        nextQuestionId: "zones",
      },
      {
        id: "flex-unsure",
        label: "Not sure",
        value: "unsure",
        scoreWeight: 2,
        nextQuestionId: "zones",
      },
    ],
  },
  {
    id: "zones",
    text: "What body zones do you want to target?",
    type: "multiple",
    category: "goal-setting",
    options: [
      {
        id: "zone-belly",
        label: "Belly",
        value: "belly",
        scoreWeight: 2,
        nextQuestionId: "timeCommitment",
      },
      {
        id: "zone-pecs",
        label: "Chest/Pecs",
        value: "pecs",
        scoreWeight: 2,
        nextQuestionId: "timeCommitment",
      },
      {
        id: "zone-arms",
        label: "Arms",
        value: "arms",
        scoreWeight: 2,
        nextQuestionId: "timeCommitment",
      },
      {
        id: "zone-legs",
        label: "Legs",
        value: "legs",
        scoreWeight: 2,
        nextQuestionId: "timeCommitment",
      },
    ],
  },
  {
    id: "timeCommitment",
    text: "How many times per week can you commit?",
    type: "single",
    category: "lifestyle",
    options: [
      {
        id: "time-1-2",
        label: "1–2 times/week",
        value: "1-2",
        scoreWeight: 1,
        nextQuestionId: "duration",
      },
      {
        id: "time-3-4",
        label: "3–4 times/week",
        value: "3-4",
        scoreWeight: 2,
        nextQuestionId: "duration",
      },
      {
        id: "time-5plus",
        label: "5+ times/week",
        value: "5+",
        scoreWeight: 3,
        nextQuestionId: "duration",
      },
    ],
  },
  {
    id: "duration",
    text: "How long would you like to train per session?",
    type: "single",
    category: "lifestyle",
    options: [
      {
        id: "dur-10",
        label: "10–15 minutes",
        value: "10-15",
        scoreWeight: 1,
        nextQuestionId: "schedule",
      },
      {
        id: "dur-15",
        label: "15–20 minutes",
        value: "15-20",
        scoreWeight: 2,
        nextQuestionId: "schedule",
      },
      {
        id: "dur-25",
        label: "20–25 minutes",
        value: "20-25",
        scoreWeight: 3,
        nextQuestionId: "schedule",
      },
      {
        id: "dur-30",
        label: "30+ minutes",
        value: "30+",
        scoreWeight: 4,
        nextQuestionId: "schedule",
      },
    ],
  },
  {
    id: "schedule",
    text: "What is your work schedule like?",
    type: "single",
    category: "lifestyle",
    options: [
      {
        id: "sched-9-5",
        label: "Work hours (9–5)",
        value: "day",
        scoreWeight: 1,
        nextQuestionId: "heightWeight",
      },
      {
        id: "sched-night",
        label: "Evenings/night",
        value: "night",
        scoreWeight: 2,
        nextQuestionId: "heightWeight",
      },
      {
        id: "sched-flex",
        label: "Flexible",
        value: "flex",
        scoreWeight: 3,
        nextQuestionId: "heightWeight",
      },
      {
        id: "sched-free",
        label: "Anytime",
        value: "free",
        scoreWeight: 4,
        nextQuestionId: "heightWeight",
      },
    ],
  },
  {
    id: "heightWeight",
    text: "What is your height and weight?",
    type: "input",
    category: "profile",
    options: [], // input fields, handle separately in form
    nextQuestionId: "weightGoal",
  },
  {
    id: "weightGoal",
    text: "What is your target weight?",
    type: "input",
    category: "goal-setting",
    options: [],
    nextQuestionId: null, // end of flow
  },
];

//   {
//     id: 3,
//     text: "What is your Experience",
//     type: "single",
//     options: [
//       { option: "Starting", value: "1" },
//       { option: "Some", value: "2" },
//       { option: "Experienced", value: "3" },
//     ],
//   },

/*
  
    {
      id: ,
      text: "",
      type: "single",
      options: [
        { option: "", value: "1" },
        { option: "", value: "2" },
        { option: "", value: "3" },
        { option: "", value: "4" },
        { option: "", value: "5" },
      ],
    },
  
  * Age 10, 20, 30, 40 , 50+  - SINGLE
  * Motivation: Look, Strong, Health, Other  - MULTIPLE
  * Goal: Muscle, Weight, Fat, Fitness  - MULTIPLE
  * Body goal: smaller, athletic, shredded, swole  - SINGLE
  Physical build: slender, medium, stocky, overweight  - SINGLE
  Experience: struggle gain weight/muscle, gain/lose weight easy, gain weight fast lose slow  - SINGLE
  best shape: <1, 1-2, >3, never  - SINGLE
  exercise experience: starting, some, experienced  - SINGLE
  blocks: motivation, plan, time, pain, none, other  - MULTIPLE
  flexible: very, medium, none, not sure  - SINGLE
  target zones; belly, pecs, arms, legs  - MULTIPLE
  
  time commitment: 1-2 times/week, 3-4, 5+  - SINGLE
  duration: 10-25 mins, 15-20, 20-25, 30+  - SINGLE
  schedule: 9-5, night, flex, free  - SINGLE
  
  height/weight => BMI
  weight goal
   */
