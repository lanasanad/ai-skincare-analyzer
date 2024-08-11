const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

app.post('/api/analyze', async (req, res) => {
  console.log("api request:", req.body);
  try {
    const { ingredients, skinConcerns, productType } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with the ingredient of a skincare product, face or body, and the product type, and the skin concerns it aims to address. Provide short points about 3 of the highlight ingredients. Say what number of 5 you would recommend it, the most being 5 stars. Just say the number you would give it, not the entire rating out of 5. Don't exceed 50 words. I want each ingredient point to start off like this: INGREDIENT - explanation. Each ingredient must be in a NEW line with space in between each ingredient."
        },
        {
          "role": "user",
          "content": `Product Type: ${productType}\nIngredients: ${ingredients}\nSkin Concerns: ${skinConcerns}`
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1
    });

    const textResponse = response.choices[0].message.content.trim();

    const ratingMatch = textResponse.match(/(\d+)/);
    const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;
    res.json({ response: textResponse.replace(/(\d+)\/5/, '').trim(), rating });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));