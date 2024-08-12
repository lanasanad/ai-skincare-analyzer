import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { ingredients, skinConcerns, productType } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.API_KEY
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You will be provided with the ingredient of a skincare product, the product type, and the skin concerns it aims to address. If there are more than 3 ingredients provided, respond in short sentences about 3 of the highlight ingredients. Don’t exceed 15 words per point. Then, give a final analysis not exceeding 25 words. I want you to respond to it with a rating, assuming the top is 5. I simply want a single number in response, which is the rating. Don’t have any bullet points or numbered lists, just a paragraph. Every new thing you talk about, I want a new line",
        },
        {
          role: "user",
          content: `Product Type: ${productType}\nIngredients: ${ingredients}\nSkin Concerns: ${skinConcerns}`
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1
    });

    const textResponse = response.choices[0].message.content.trim();
    console.log("API response text:", textResponse);

    const ratingMatch = textResponse.match(/(\d+)$/);
    const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;
    const cleanedResponse = textResponse.replace(/(\d+)$/, '').trim();

    return NextResponse.json({ response: cleanedResponse, rating });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
