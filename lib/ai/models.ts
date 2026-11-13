export const DEFAULT_CHAT_MODEL = "cognitivecomputations/dolphin-mixtral-8x7b";

export const titleModel = {
  description: "Fast model for title generation",
  id: "cognitivecomputations/dolphin-mixtral-8x7b",
  name: "Dolphin Mixtral 8x7b",
  provider: "cognitivecomputations",
};

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  gatewayOrder?: string[];
  reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high";
};

export const chatModels: ChatModel[] = [
  {
    description: "Fully uncensored model fine-tuned for complex coding and logic tasks.",
    id: "cognitivecomputations/dolphin-mixtral-8x7b",
    name: "Dolphin Mixtral 8x7b",
    provider: "cognitivecomputations",
  },
  {
    description: "Advanced open-weight model with robust reasoning and zero built-in refusals.",
    id: "nousresearch/hermes-3-llama-3.1-405b:free",
    name: "Hermes 3 405B",
    provider: "nousresearch",
  },
  {
    description: "High-performance model for deep technical analysis and scripting.",
    id: "deepseek/deepseek-chat",
    name: "DeepSeek V3",
    provider: "deepseek",
  },
];

export async function getCapabilities(): Promise<
  Record<string, ModelCapabilities>
> {
  // Returns default capabilities for OpenRouter models locally
  return Object.fromEntries(
    chatModels.map((m) => [
      m.id,
      { reasoning: true, tools: true, vision: true },
    ])
  );
}

export const isDemo = process.env.IS_DEMO === "1";

type GatewayModel = {
  id: string;
  name: string;
  type?: string;
  tags?: string[];
};

export type GatewayModelWithCapabilities = ChatModel & {
  capabilities: ModelCapabilities;
};

export async function getAllGatewayModels(): Promise<
  GatewayModelWithCapabilities[]
> {
  return chatModels.map((m) => ({
    ...m,
    capabilities: { reasoning: true, tools: true, vision: true },
  }));
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);

export type ModelAvailability = "healthy" | "impacted" | "unknown";

export async function getModelAvailability(
  _modelId: string
): Promise<ModelAvailability> {
  return "healthy";
}


