import "server-only";

import { generateText, type UIMessage } from "ai";
import { getTitleModel } from "@/lib/ai/providers";
import { getTextFromMessage } from "@/lib/utils";

const MAX_TITLE_PROMPT_LENGTH = 2000;

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text } = await generateText({
    model: getTitleModel(),
    prompt: getTextFromMessage(message).slice(0, MAX_TITLE_PROMPT_LENGTH),
  });

  return text
    .replace(/^[#*"\s]+/, "")
    .replace(/["]+$/, "")
    .trim();
}