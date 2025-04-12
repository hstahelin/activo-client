/**
 * Extracts and parses the first JSON object from an OpenAI response string.
 * Safely handles markdown fences, trailing commentary, and attempts to auto-repair invalid JSON.
 *
 * @param {string} content - The raw OpenAI message content.
 * @returns {object} Parsed JSON object.
 * @throws Will throw an error if no valid JSON block is found or parsing fails.
 */
export function extractJSONFromOpenAI(content) {
  if (!content || typeof content !== "string") {
    throw new Error("Invalid content provided to extractJSONFromOpenAI");
  }

  // Remove markdown fences
  let cleaned = content.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```json|```/g, "").trim();
  }

  // Extract the first JSON block
  const match = cleaned.match(/{[\s\S]*}/);
  if (!match) {
    throw new Error("No valid JSON block found in OpenAI response.");
  }

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.warn(
      "Initial JSON.parse failed. Attempting to auto-fix common issues..."
    );

    // Try to auto-quote values like: Reps: 15 each side → Reps: "15 each side"
    const fixed = match[0].replace(
      /(:\s*)([^",\{\[\]\}\n]+\s[^",\{\[\]\}\n]+)(\s*[\},])/g,
      (full, p1, p2, p3) => {
        return `${p1}"${p2.trim()}"${p3}`;
      }
    );

    try {
      return JSON.parse(fixed);
    } catch (secondErr) {
      console.error("Failed to parse extracted JSON after auto-fix:\n", fixed);
      throw new Error(
        "JSON parsing error after attempted fix: " + secondErr.message
      );
    }
  }
}
