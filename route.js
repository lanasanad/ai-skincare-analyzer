require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { ingredients, skinConcerns, productType } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You will be provided with the ingredient of a skincare product, the product type, and the skin concerns it aims to address. If there are more than 3 ingredients provided, respond in short sentences about 3 of the highlight ingredients. Don’t exceed 17 words per point. Then, give a final analysis not exceeding 20 words. I want you to respond to it with a rating, assuming the top is 5. I simply want a single number in response, which is the rating. Don’t have any bullet points or numbered lists, just a paragraph.",
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
    
    res.json({ response: cleanedResponse, rating });
    



  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
