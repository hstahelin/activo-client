/**
 * Extracts and parses the first JSON object from an OpenAI response string.
 * Safely handles markdown fences and trailing commentary.
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
    console.error("Failed to parse extracted JSON:", match[0]);
    throw new Error("JSON parsing error: " + err.message);
  }
}
