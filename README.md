# LangGraph Arithmetic Agent

A straightforward AI-powered arithmetic calculator built using LangGraph and LangChain. This project demonstrates how to create a conversational agent that can perform basic mathematical operations through tool calling.

## Features

- **Multi-LLM Support**: Easily switch between OpenAI GPT, Anthropic Claude, and Google Gemini models
- **Tool Calling**: Implements arithmetic operations (addition, subtraction, multiplication, division) as callable tools
- **State Management**: Uses LangGraph's state schema to track messages and LLM call counts
- **Modular Design**: Clean separation of concerns with dedicated files for nodes, conditions, and graph setup

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/langgraph-arithmetic-agent.git
   cd langgraph-arithmetic-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   CLAUDE_API_KEY=your_anthropic_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

## Usage

The project is configured to use Google Gemini by default. To change the LLM, uncomment the desired model in `index.js` and comment out the others.

Run the agent:
```bash
node index.js
```

Example output for the query "Add 5 and 3 then multiply that by 2 and divide it by 4 and lastly subtract 1":
```
[human]: Add 5 and 3 then multiply that by 2 and divide it by 4 and lastly subtract 1
[ai]: The user wants to perform: 5 + 3 = 8, then 8 * 2 = 16, then 16 / 4 = 4, then 4 - 1 = 3.
I'll start by adding 5 and 3.
[tool]: 8
[ai]: Now I need to multiply 8 by 2.
[tool]: 16
[ai]: Next, divide 16 by 4.
[tool]: 4
[ai]: Finally, subtract 1 from 4.
[tool]: 3
[ai]: The final result is 3.
```

## Project Structure

- `index.js`: Main entry point, sets up the LLM and graph, defines tools
- `graph.js`: Defines the MessagesState schema
- `nodes.js`: Contains the LLM call node and tool execution node
- `conditionNode.js`: Conditional logic for graph flow
- `package.json`: Project dependencies and scripts

## Dependencies

- `@langchain/core`: Core LangChain functionality
- `@langchain/langgraph`: Graph-based workflow management
- `@langchain/anthropic`: Anthropic Claude integration
- `@langchain/google-genai`: Google Gemini integration
- `@langchain/openai`: OpenAI GPT integration
- `zod`: Schema validation
- `dotenv`: Environment variable management
