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
          content: "You will be provided with the ingredient of a skincare product, the product type, and the skin concerns it aims to address. Respond with a sentence about a few of the highlight ingredients, each sentence being at least 8 words long. Then, give a final analysis statement. Do not include the explicit word 'final analysis:'. IMPORTANT: Your entire response must be at least 22 words, and ALWAYS end your response with a rating from 1 to 5, where 5 is the best. The rating should be a single number at the very end of your response, this is VITAL.",        },
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
    let rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;
    let cleanedResponse = textResponse.replace(/(\d+)$/, '').trim();

    if (cleanedResponse.split(' ').length > 10 && rating === null) {
      rating = 4;
    }

    cleanedResponse = cleanedResponse.split('. ').join('.\n\n');

    return NextResponse.json({ response: cleanedResponse, rating });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}