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
          content: "You will be provided with an ingredients list of a skincare product, the type of product and the skin concerns it aims to address. Your task is to respond in a total of 38-58 words. This should include 1-2 pros and 1-2 cons (Pros: Cons:) and an overall recommendation. IMPORTANT: END your response with a rating from 1 to 5, where 5 is the best. It should be a single number WITHOUT A FULL STOP. Structure your final sentence like this: ‘Rating: 3’",
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