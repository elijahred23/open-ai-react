import express from 'express';
import bodyParser from 'body-parser';
import { getOpenAIVision } from './vision.js';
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("HELLO WORLD, THIS IS YOUR ELI GPT API")
});

app.post('/openai/vision', async (req, res) => {
    try {
        const imageUrl = req.body.imageUrl;
        const prompt = req.body.prompt;

        // Validate imageUrl and prompt as needed

        const result = await getOpenAIVision(imageUrl, prompt);

        // Handle the result as needed
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`ELI-GPT LISTENING ON PORT ${port}`);
})