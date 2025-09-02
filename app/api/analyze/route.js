import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

export async function POST(request) {
  try {
    const { ingredients, skinConcerns, productType } = await request.json();

    const client = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY
    });

    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "system",
          content: "You will be provided with an ingredients list of a skincare product, the type of product, and the skin concerns it aims to address. Your task is to respond in 40-60 words including 1-2 pros and 1-2 cons (start with 'Pros:' and 'Cons:') and an overall recommendation ('Overall Recommendation:'). Do not use any extra asterisks or symbols. End your response with a rating from 1 to 5, like 'Rating: 3' Each point should be a bullet point and start on a new line. Every title (Pros:, Cons:, Overall Reccomendation: should start on a new line, alone)"
        },
        {
          role: "user",
          content: `Product Type: ${productType}\nIngredients: ${ingredients}\nSkin Concerns: ${skinConcerns}`
        }
      ],
    });

    const textResponse = chatResponse.choices[0].message.content.trim();
    const ratingMatch = textResponse.match(/(\d+)$/);
    let rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;

    let cleanedResponse = textResponse.replace(/\*\*/g, '');

    const lines = cleanedResponse.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const processedLines = lines.map(line => {
      if (
        line.startsWith('Pros:') ||
        line.startsWith('Cons:') ||
        line.startsWith('Overall Recommendation:') ||
        line.startsWith('Recommendation:')
      ) {
        return line;
      }

      if (line.match(/Rating:\s*\d+/)) {
        return line;
      }

      if (!line.startsWith('-') && !line.startsWith('•')) {
        return `- ${line}`;
      }

      return line;
    });

    cleanedResponse = processedLines.join('<br/>');

    cleanedResponse = cleanedResponse
      .replace(/Pros:/, '<u>Pros:</u>')
      .replace(/Cons:/, '<br/><u>Cons:</u>')
      .replace(/Overall Recommendation:/, '<br/><u>Overall Recommendation:</u>')

    if (cleanedResponse.split(' ').length > 10 && rating === null) {
      rating = 4;
    }

    return NextResponse.json({
      response: cleanedResponse,
      rating
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}