// Import prompts as raw text
import anthropicPrompt from "./prompts/anthropic.txt" with { type: "raw" };
import beastPrompt from "./prompts/beast.txt" with { type: "raw" };
import codexPrompt from "./prompts/codex.txt" with { type: "raw" };

/**
 * Get the full system prompt for a model.
 */
export const getSystemPrompt = (modelId?: string): string => {
  if (modelId) {
    const id = modelId.toLowerCase();

    if (id.includes("gpt-5") || id.includes("codex")) {
      return codexPrompt;
    }
    if (id.includes("gpt-") || id.includes("o1") || id.includes("o3")) {
      return beastPrompt;
    }
    if (id.includes("claude")) {
      return anthropicPrompt;
    }
  }
  // Fallback for other models
  return anthropicPrompt;
};
