const model = require("../services/gemini");

const generateText3 = async (req, res) => {
  try {
    const { fitnessType, frequency, experience, goal } = req.body;

    if (!fitnessType || !frequency || !experience || !goal) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const prompt = `
      You are a professional fitness coach. Given the user's fitness experience, training frequency, and goal, generate a **structured fitness plan** in **JSON format**.

      ### **Schema Requirements**:
      The JSON response should have the following structure:

      {
        "fitness_plan": {
          "experience_level": "string",
          "goal": "string",
          "training_frequency": "number",
          "workout_split": [
            {
              "day": "string",
              "focus": "string",
              "exercises": [
                {
                  "name": "string",
                  "sets": "number",
                  "reps": "string"
                }
              ]
            }
          ],
          "diet_recommendations": {
            "caloric_intake": "string",
            "macronutrient_breakdown": {
              "protein": "string",
              "carbs": "string",
              "fats": "string"
            },
            "meal_timing": "string",
            "example_meals": [
              {
                "meal": "string",
                "foods": ["string"]
              }
            ]
          },
          "recovery_tips": ["string"],
          "warnings": ["string"]
        }
      }

      ### **User Input**:
      I am a **${experience}** individual looking to focus on **${fitnessType}**.
      My goal is to **${goal}**, and I plan to train **${frequency}** times per week.

      Provide a structured fitness guideline including:
      - Recommended exercises** with sets and reps.
      - Workout split(daily training focus).
      - Dietary recommendations** (caloric intake, macronutrient breakdown, example meals).
      - Recovery tips** and **warnings** to avoid injury.
      - Return the response in the above JSON format**.
    `;


    const result = await model(prompt);
    const markdownResponse = result.text();

    
    const jsonMatch = markdownResponse.match(/```json\s*([\s\S]*?)\s*```/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid response format. No JSON found." });
    }

    let fitnessPlan;
    try {
      fitnessPlan = JSON.parse(jsonMatch[1]);

      if (fitnessPlan.plan && fitnessPlan.plan.fitness_plan) {
        fitnessPlan = fitnessPlan.plan.fitness_plan;
      }


      res.json(fitnessPlan);

    } catch (parseError) {
      console.error("Error parsing JSON:", parseError.message);
      return res.status(500).json({ error: "Error parsing JSON response from API." });
    }

  } catch (err) {
    console.error("Error in generateText3:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports = generateText3;