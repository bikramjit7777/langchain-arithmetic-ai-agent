import {tool} from '@langchain/core/tools';
import { MessagesAnnotation, StateGraph, START, END } from "@langchain/langgraph"
import { ChatAnthropic } from "@langchain/anthropic";
import {z} from 'zod'
import {ChatOpenAI} from '@langchain/openai'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai'
import { config } from 'dotenv';
import { HumanMessage } from "@langchain/core/messages";
import { MessagesState } from "./graph.js";
import {shouldContinue} from "./conditionNode.js";
import { llmCall, toolNode } from "./nodes.js";

config();

// ------------- Open AI
// const llm = new ChatOpenAI({
//     modelName: 'gpt-3.5-turbo',
//     apiKey: process.env.OPENAI_API_KEY
// })

// ------------- Anthropic
// const llm = new ChatAnthropic({
//   model: "claude-sonnet-4-6",
//   temperature: 0,
//   apiKey: process.env.CLAUDE_API_KEY
// });

// ------------- Google Gemini
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY
});


const add = tool(({ a, b }) => a + b, {
  name: "add",
  description: "Add two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

const subtract = tool(({ a, b }) => a - b, {
  name: "subtract",
  description: "Subtract two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

const multiply = tool(({ a, b }) => a * b, {
  name: "multiply",
  description: "Multiply two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

const divide = tool(({ a, b }) => a / b, {
  name: "divide",
  description: "Divide two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

export const toolsByName = {
  [add.name]: add,
  [subtract.name]: subtract,
  [multiply.name]: multiply,
  [divide.name]: divide,
};
const tools = Object.values(toolsByName);
export const llmWithTools = llm.bindTools(tools);


const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();


const result = await agent.invoke({
  messages: [new HumanMessage("Add 5 and 3 then multiply that by 2 and divide it by 4 and lastly subtract 1")],
});

for (const message of result.messages) {
  console.log(`[${message.type}]: ${message.text}`);
}