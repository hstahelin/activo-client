// --- mapping.json equivalent ---
export const MAPPINGS = {
  zonesToMuscles: {
    belly: ["abdominals"],
    pecs: ["chest", "shoulders"],
    arms: ["biceps", "triceps"],
    legs: ["quadriceps", "hamstrings", "glutes", "calves"],
  },

  goalsToForce: {
    muscle: ["push", "pull"],
    weight: ["pull"],
    fat: ["pull", "compound"],
    fitness: ["pull", "compound"],
  },

  experienceToLevel: {
    beginner: "beginner",
    intermediate: "intermediate",
    advanced: "expert",
  },

  flexibilityToCategory: {
    very: [],
    medium: ["stretching"],
    none: ["stretching"],
    unsure: ["stretching"],
  },

  motivationToCategory: {
    look: ["strength"],
    strong: ["strength"],
    health: ["cardio", "stretching"],
    other: [],
  },

  durationToMechanic: {
    "10-15": ["compound"],
    "15-20": ["compound"],
    "20-25": ["compound", "isolation"],
    "30+": ["compound", "isolation"],
  },
};

// --- Utility Functions ---
export function getTargetMuscles(zones = []) {
  const { zonesToMuscles } = MAPPINGS;
  const muscles = new Set();

  zones.forEach((zone) => {
    (zonesToMuscles[zone] || []).forEach((m) => muscles.add(m));
  });

  return Array.from(muscles);
}

export function getForces(goals = []) {
  const { goalsToForce } = MAPPINGS;
  const forces = new Set();

  goals.forEach((goal) => {
    (goalsToForce[goal] || []).forEach((f) => forces.add(f));
  });

  return Array.from(forces);
}

export function getLevelFromExperience(experience) {
  return MAPPINGS.experienceToLevel[experience] || "beginner";
}

export function getStretchingCategoriesFromFlex(flexibility) {
  return MAPPINGS.flexibilityToCategory[flexibility] || [];
}

export function getCategoriesFromMotivation(motivations = []) {
  const { motivationToCategory } = MAPPINGS;
  const categories = new Set();

  motivations.forEach((m) => {
    (motivationToCategory[m] || []).forEach((c) => categories.add(c));
  });

  return Array.from(categories);
}

export function getMechanicsFromDuration(duration) {
  return MAPPINGS.durationToMechanic[duration] || ["compound"];
}

// --- Combined Example ---
export function deriveFiltersFromAnswers(answers) {
  return {
    muscles: getTargetMuscles(answers.zones),
    forces: getForces(answers.goals),
    level: getLevelFromExperience(answers.exerciseExperience),
    categories: [
      ...getStretchingCategoriesFromFlex(answers.flexibility),
      ...getCategoriesFromMotivation(answers.motivation),
    ],
    mechanic: getMechanicsFromDuration(answers.duration),
  };
}

// Example call:
// deriveFiltersFromAnswers({
//   zones: ["belly", "arms"],
//   goals: ["muscle", "fat"],
//   exerciseExperience: "beginner",
//   flexibility: "none",
//   motivation: ["look", "health"],
//   duration: "20-25"
// });
