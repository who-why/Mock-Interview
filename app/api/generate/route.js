import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const responses = Array.isArray(body) ? body : body.responses;
    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: "Invalid input format" }, { status: 400 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
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

        Provide structured, constructive feedback, focusing on accuracy, communication skills, strengths, weaknesses, and areas for improvement.

        Specifically:
        1. **Accuracy (Percentage):** Evaluate the correctness and completeness of the answer. Provide a percentage score (0-100%).
        2. **Communication (Out of 10):** Rate how well the answer is structured, articulated, and conveyed.
        3. **Strengths:** List the key strengths of the answer.
        4. **Weaknesses:** List specific weaknesses or missing details.
        5. **Recommendations for Improvement:** Provide actionable steps for improvement.

        **Important Guidelines:**
          * **JSON Output Only:** Return valid JSON in the specified format, without additional text.
          * **Conciseness:** Keep strengths, weaknesses, and recommendations brief and to the point.
          * **Constructive Tone:** Maintain an encouraging tone while pointing out weaknesses.
          * **Technical Depth:** Ensure feedback is relevant and accurate.

        **JSON Format:** Return feedback as a JSON object:
        \`\`\`json
        {
          "accuracy": "80%",
          "communication": "7/10",
          "strengths": ["Clearly explained core concepts", "Good example usage"],
          "weaknesses": ["Lack of depth in edge cases", "Did not mention performance trade-offs"],
          "recommendations": ["Study more on edge cases", "Improve explanation of trade-offs"]
        }
        \`\`\`
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = await response.text();

      try {
        const jsonMatch = text.match(/```json\n(.*)\n```/s);
        if (jsonMatch && jsonMatch[1]) {
          text = jsonMatch[1].trim();
          text = text.replace(/```json/g, "").replace(/```/g, "").trim();
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
            error: "Error parsing AI response. Check server logs for details.",
            raw_output: text,
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
