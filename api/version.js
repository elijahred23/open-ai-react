
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const APIKEY = '';
async function getOpenAIVision(imageUrl, prompt) {
  // Function to encode the image
  function encodeImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return Buffer.from(imageBuffer).toString('base64');
  }
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${APIKEY}`
  };

  const payload = {
    "model": "gpt-4-vision-preview",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": prompt
          },
          {
            "type": "image_url",
            "image_url": {
              "url": imageUrl
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export {
    getOpenAIVision
}

