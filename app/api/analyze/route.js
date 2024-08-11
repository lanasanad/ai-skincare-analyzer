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
          content: "You will be provided with the ingredient of a skincare product, the product type, and the skin concerns it aims to address. If there are more than 3 ingredients provided, respond in short points about 3 of the highlight ingredients. Don’t exceed 15 words per point. Then,give a final analysis, and Say what rating out of 5 you would give it.",
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

    const ratingMatch = textResponse.match(/(\d+)/);
    const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;
    return NextResponse.json({ response: textResponse.replace(/(\d+)\/5/, '').trim(), rating });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
