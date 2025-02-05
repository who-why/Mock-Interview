import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Ensure input is an array (handles both formats)
    const responses = Array.isArray(body) ? body : body.responses;

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: "Invalid input format" }, { status: 400 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Use environment variable
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined in environment variables.");
      return NextResponse.json({ error: "GEMINI_API_KEY not found" }, { status: 500 });
    }


    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let feedbackResults = [];

    for (let item of responses) {
      const prompt = `
        You are an AI interview coach. Analyze the following response to a technical question.

        Question: ${item.ques}
        User's Answer: ${item.ans}

        Provide structured, constructive feedback, focusing on both what the candidate did well and areas for improvement. Be concise but thorough.

        Specifically:
        1. **Correctness (Percentage):**  How accurate and complete is the answer? Evaluate based on technical accuracy and comprehensiveness. Provide a percentage score (0-100%).
        2. **Strengths:**  Identify and list the key strengths of the answer. What did the candidate demonstrate well?
        3. **Weaknesses:**  Pinpoint specific weaknesses, missing information, or areas where the answer could be improved. Be specific and avoid general statements.
        4. **Suggestions for Improvement:** Provide actionable steps the candidate can take to improve their answer in the future.  Focus on concrete advice.

        **Important Guidelines:**
          * **JSON Output Only:** The *only* thing you should return is valid JSON in the specified format.  No introductory text, no concluding remarks. Only the JSON.
          * **Conciseness:**  Keep the strengths, weaknesses, and suggestions brief and to the point.  Aim for a few sentences each.
          * **Constructive Tone:**  Maintain a positive and encouraging tone, even when pointing out weaknesses.
          * **Clarity:** Ensure the feedback is easy to understand and directly relevant to the question and answer.
          * **Technical Depth:**  Demonstrate an understanding of the technical concepts involved in the question and answer.

        **JSON Format:**  Return the feedback as a JSON object with the following structure:
        \`\`\`json
        {
          "correctness": "75%",
          "strengths": "Well-structured explanation of asynchronous JavaScript and its benefits.",
          "weaknesses": "Didn't mention error handling strategies or potential drawbacks of asynchronous code.",
          "suggestions": "Research and understand common error handling techniques in asynchronous JavaScript (e.g., try/catch with async/await, .catch() with Promises). Also, consider mentioning potential issues like callback hell or increased complexity."
        }
        \`\`\`
        **DO NOT** include any explanations or text before or after the JSON output.
      `;


      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = await response.text();

      // *** FIX: Extract the JSON from the Markdown block ***
      try {
        // Attempt to extract JSON using a regex
        const jsonMatch = text.match(/```json\n(.*)\n```/s);
        if (jsonMatch && jsonMatch[1]) {
          text = jsonMatch[1].trim(); // Extract the JSON and trim whitespace
        } else {
          // If regex fails, try removing backticks and "json"
          text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        const feedback = JSON.parse(text);
        feedbackResults.push({
          question: item.ques,
          answer: item.ans,
          feedback: feedback,
        });
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError, "AI Output:", text);
        feedbackResults.push({
          question: item.ques,
          answer: item.ans,
          feedback: {
            error: "Error parsing AI response.  Check server logs for details.",
            raw_output: text, // Include raw output for debugging
          },
        });
      }
    }

    return NextResponse.json({ feedbackResults });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}