const model = require("../services/gemini");

// POST request to /generate-text2 with the following JSON payload:
// {
// "fitnessType": "strength training",
// "frequency": "4",
// "experience": "beginner",
// "goal": "build muscle and increase overall strength"
// }

const generateText2 = async (req, res) => {

  const { age, gender, healthGoal, dietPreference, workoutDays } = req.body;//|| {};

  if (!age || !gender || !healthGoal || !dietPreference || !workoutDays) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const prompt = `
  I am a ${age}-year-old ${gender} aiming to ${healthGoal}.
  My diet preference is ${dietPreference}, and I can work out ${workoutDays} days per week.
  Please provide a personalized weekly health and fitness plan, including exercise types, duration, and meal suggestions.
`;

  try {
    const result = await model(prompt);
    res.json({ output: result.text() });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }


};

module.exports = generateText2;
