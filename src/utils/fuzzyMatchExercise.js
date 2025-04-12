/**
 * Performs a fuzzy match to find the closest exercise from ExerciseDB by name.
 * Tries exact match first, then partial includes, then case-insensitive Levenshtein distance.
 *
 * @param {string} name - The exercise name to search for.
 * @param {Array} exerciseList - List of exercises from ExerciseDB.
 * @returns {object|null} - Closest matching exercise object or null.
 */
export function fuzzyMatchExercise(name, exerciseList) {
  if (!name || !Array.isArray(exerciseList)) return null;

  const normalized = name.toLowerCase().trim();

  // 1. Exact match
  let match = exerciseList.find((ex) => ex.name.toLowerCase() === normalized);
  if (match) return match;

  // 2. Partial match
  match = exerciseList.find((ex) => ex.name.toLowerCase().includes(normalized));
  if (match) return match;

  // 3. Fuzzy match (Levenshtein distance)
  const levenshtein = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, () => []);
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  };

  let closest = null;
  let minDistance = Infinity;

  for (const ex of exerciseList) {
    const distance = levenshtein(normalized, ex.name.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closest = ex;
    }
  }

  return minDistance <= 3 ? closest : null; // Only accept reasonably close matches
}
