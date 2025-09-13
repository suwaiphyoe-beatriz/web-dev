const model = require("../services/gemini");


// POST request to /generate-text1 with the following JSON payload:
// {
//   "prompt": "Write 3 practical tips for staying productive while working from home."
// }

const generateText1 = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await model("Suggest 5 creative marketing ideas for a small coffee shop.");
    res.json({ output: result.text() });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = generateText1;

