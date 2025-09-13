# Using LLM – Part 1

> [!NOTE]
>  This is the first in a two‑part series on using the Gemini LLM. In this part, we focus on text generation with both static and dynamic prompts, and on receiving structured responses. [Part 2](https://github.com/tx00-resources-en/AI-part2) covers analyzing images, audio, and documents.

---

## TOC

- [Step 0: Prerequisites](#step-0-prerequisites)
- [Step 1: Setup Instructions](#step-1-setup-instructions)
- [Step 2: Testing the Endpoints with Postman](#step-2-testing-the-endpoints-with-postman)
- [Code Reference: textController1.js - Calling the Gemini LLM](#code-reference-textcontroller1js---calling-the-gemini-llm)
  - [Task 1](#task-1)
- [Code Reference: textController2.js - Using Dynamic Prompts](#endpoint-2--fitness-plan-markdown-output)
  - [Task 2](#task-2-create-a-dynamic-health-prompt)
- [Code Reference: textController3.js - Structured Output with Gemini](#endpoint-3--fitness-plan-structured-json-output)
  - [Task 3](./doc/task3.md)
- [Code Reference: Model Configuration](#code-reference-model-configuration)
- [Additional Resources](#additional-resources)


---

## Step 0: Prerequisites

- **Gmail Account** – Create a personal Gmail account if you don’t already have one.
- **API Key** – Generate one at [Google AI Studio](https://aistudio.google.com/app/apikey) and store it somewhere safe.

---

## Step 1: Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/tx00-resources-en/AI-part1
   cd AI-part1
   ```

2. **Remove Git history**  
   ```bash
   rm -rf .git
   ```

3. **Configure environment variables**  
   - Open `.env.example`  
   - On **line 1**, replace the dummy key  
     ```
     Jh6AIvfYH87KKL34KllmsHg
     ```  
     with the API key you generated earlier.
   - Rename the file `.env.example`  to ` .env`  

4. **Install dependencies**  
   ```bash
   npm install
   ```

5. **Start the development server**  
   ```bash
   npm run dev
   ```

---

## Step 2: Testing the Endpoints with Postman

### **Endpoint 1 – Text Generation**
- **POST** `http://localhost:4000/api/generate-text1`  
- **Body (raw JSON)**:
  ```json
  {
    "prompt": "Write 3 practical tips for staying productive while working from home."
  }
  ```
- **Expected:** Response from Gemini LLM with generated text.
- You can modify prompts in the request body to experiment with different outputs.

### **Endpoint 2 – Fitness Plan (Markdown Output)**
- **POST** `http://localhost:4000/api/generate-text2`  
- **Body (raw JSON)**:
  ```json
  {
    "fitnessType": "strength training",
    "frequency": "4",
    "experience": "beginner",
    "goal": "build muscle and increase overall strength"
  }
  ```
- **Expected:** Response in **Markdown** format.
- You can modify prompts in the request body to experiment with different outputs.

### **Endpoint 3 – Fitness Plan (Structured JSON Output)**
- **POST** `http://localhost:4000/api/generate-text3`  
- **Body (raw JSON)**:
  ```json
  {
    "fitnessType": "strength training",
    "frequency": "4",
    "experience": "beginner",
    "goal": "build muscle and increase overall strength"
  }
  ```
- **Expected:** Structured **JSON** response.
- You can modify prompts in the request body to experiment with different outputs.

---

## Code Reference: `textController1.js` - Calling the Gemini LLM

The simplest way to call the Gemini LLM is illustrated in [`textController1.js`](./controllers/textController1.js):

1. **Import the model** (line 1):  
   ```js
   const model = require("../services/gemini");
   ```

2. **Call the model** (line 17):  
   ```js
   const result = await model(prompt);
   ```

3. **Return the result** (line 17):  
   ```js
   res.json({ output: result.text });
   ```

**Notes:**
- We use `async/await` because `model()` returns a Promise — just like when we worked with Mongoose/MongoDB.
- The prompt being sent is currently **static** (line 13 in the example below).


### Task 1: 

- Change the static prompt text to a **different prompt** of your choice.  
  For example:  
  ```json
  {
    "prompt": "Suggest 5 creative marketing ideas for a small coffee shop."
  }
  ```
- Send the request and **test the response** from the LLM.


---

## Code Reference: `textController2.js` - Using Dynamic Prompts

If we want to have a **dynamic prompt**, we can pass dynamic data from the client (e.g., a React frontend or Postman) and construct the prompt on the server.

This is illustrated in [`textController2.js`](./controllers/textController2.js):

- **Destructure the dynamic data** (line 13):  
  ```js
  const { fitnessType, frequency, experience, goal } = req.body; // || {}
  ```

- **Construct the prompt** (lines 19–23):  
  ```js
  const prompt = `
    I am a ${experience} individual looking to focus on ${fitnessType}.
    My goal is to ${goal}, and I plan to train ${frequency} times per week.
    Provide a structured fitness guideline including recommended exercises, duration, and any diet suggestions.
  `;
  ```

### Task 2: Create a Dynamic Health Prompt

1. **In your controller**, destructure the data from `req.body`:
   ```js
   const { age, gender, healthGoal, dietPreference, workoutDays } = req.body;
   ```

2. check if empty fields

   ```js
   if (!age || !gender || !healthGoal || !dietPreference || !workoutDays) {
    return res.status(400).json({ message: "All fields are required." });
   }
   ```

2. **Construct a dynamic prompt** using template literals:
   ```js
   const prompt = `
     I am a ${age}-year-old ${gender} aiming to ${healthGoal}.
     My diet preference is ${dietPreference}, and I can work out ${workoutDays} days per week.
     Please provide a personalized weekly health and fitness plan, including exercise types, duration, and meal suggestions.
   `;
   ```

3. **Pass the prompt** to your Gemini model:
   ```js
   const result = await model(prompt);
   res.json({ output: result.text });
   ```

4. **From Postman**, send a `POST` request with the following JSON body:  
   ```json
   {
     "age": 35,
     "gender": "female",
     "healthGoal": "improve cardiovascular endurance",
     "dietPreference": "vegetarian",
     "workoutDays": 4
   }
   ```

---

## Code Reference: `textController3.js` - Structured Output with Gemini

In the previous controller, we didn’t have much control over the format of the LLM’s output. To ensure a **structured output**, we need to be very explicit in the prompt about the required format.  

This is illustrated  (*lines 5–59*) in [`textController3.js`](./controllers/textController3.js):

```js
const prompt = `
  You are a professional fitness coach. Given the user's fitness experience, training frequency, and goal, generate a **structured fitness plan** in **JSON format**.
  
  ### Schema Requirements:
  The JSON response must follow this structure:
  
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
  
  ### User Input:
  I am a ${experience} individual looking to focus on ${fitnessType}.
  My goal is to ${goal}, and I plan to train ${frequency} times per week.
  
  Provide a structured fitness guideline including:
  - Recommended exercises with sets and reps.
  - Workout split (daily training focus).
  - Dietary recommendations (caloric intake, macronutrient breakdown, example meals).
  - Recovery tips and warnings to avoid injury.
  - Return the response in the above JSON format.
`;
```

**Sample Output**

```json
{
  "fitness_plan": {
    "experience_level": "intermediate",
    "goal": "build muscle",
    "training_frequency": 4,
    "workout_split": [
      {
        "day": "Monday",
        "focus": "Upper Body – Push",
        "exercises": [
          { "name": "Barbell Bench Press", "sets": 4, "reps": "8–10" },
          { "name": "Overhead Press", "sets": 3, "reps": "8–10" },
          { "name": "Incline Dumbbell Press", "sets": 3, "reps": "10–12" },
          { "name": "Triceps Rope Pushdown", "sets": 3, "reps": "12–15" }
        ]
      },
      {
        "day": "Tuesday",
        "focus": "Lower Body – Squat Focus",
        "exercises": [
          { "name": "Back Squat", "sets": 4, "reps": "6–8" },
          { "name": "Romanian Deadlift", "sets": 3, "reps": "8–10" },
          { "name": "Walking Lunges", "sets": 3, "reps": "12 steps each leg" },
          { "name": "Standing Calf Raise", "sets": 3, "reps": "15–20" }
        ]
      },
      {
        "day": "Thursday",
        "focus": "Upper Body – Pull",
        "exercises": [
          { "name": "Pull-Ups", "sets": 4, "reps": "6–10" },
          { "name": "Barbell Row", "sets": 3, "reps": "8–10" },
          { "name": "Face Pulls", "sets": 3, "reps": "12–15" },
          { "name": "Barbell Curl", "sets": 3, "reps": "10–12" }
        ]
      },
      {
        "day": "Friday",
        "focus": "Lower Body – Deadlift Focus",
        "exercises": [
          { "name": "Deadlift", "sets": 4, "reps": "5–6" },
          { "name": "Front Squat", "sets": 3, "reps": "8–10" },
          { "name": "Hip Thrust", "sets": 3, "reps": "10–12" },
          { "name": "Seated Calf Raise", "sets": 3, "reps": "15–20" }
        ]
      }
    ],
    "diet_recommendations": {
      "caloric_intake": "2,800 kcal/day",
      "macronutrient_breakdown": {
        "protein": "180g",
        "carbs": "350g",
        "fats": "80g"
      },
      "meal_timing": "3 main meals and 2 snacks spaced evenly throughout the day",
      "example_meals": [
        {
          "meal": "Breakfast",
          "foods": ["Oatmeal with whey protein and berries", "Scrambled eggs with spinach"]
        },
        {
          "meal": "Lunch",
          "foods": ["Grilled chicken breast", "Brown rice", "Steamed broccoli"]
        },
        {
          "meal": "Dinner",
          "foods": ["Salmon fillet", "Sweet potato", "Asparagus"]
        },
        {
          "meal": "Snack",
          "foods": ["Greek yogurt with honey", "Almonds"]
        }
      ]
    },
    "recovery_tips": [
      "Aim for 7–9 hours of sleep per night",
      "Incorporate stretching or foam rolling after workouts",
      "Take at least one full rest day per week"
    ],
    "warnings": [
      "Avoid increasing weight too quickly to prevent injury",
      "Maintain proper form during all lifts"
    ]
  }
}
```

### Task 3: Task: Build a Structured Health Plan Endpoint

> [Task 3](./doc/task3.md)

---

## Code Reference: Model Configuration

The code to configure Gemini LLM is in[ `services/gemini.js`](./services/gemini.js):

- On **line 6**, you can choose from different models, e.g., `gemini-2.5-flash`, `gemini-2.0-flash`.  
  For rapid prototyping, we are **using** `gemini-2.5-flash-lite` because it allows more requests before reaching the free limit.

- On **line 15**, there is a config property named `temperature` set to `0.1`.  
  This controls randomness in the output:  
  - `0.0` → Deterministic  
  - `0.7–1.0` → More random, creative responses


### 4. Configure environment variables

1. Open [`.env.example`](./.env.example).  
   - On **line 1**, replace the placeholder with your API key, for example:  
     ```env
     GEMINI_API_KEY=Jh6AIvfYH87KKL34KllmsHg
     ```

2. Rename the file from `.env.example` to `.env`.  
   - We do this because `.env` is listed in `.gitignore`, so your API key will not be committed to the repository.

---

## Additional Resources

- [Text Generation Docs](https://ai.google.dev/gemini-api/docs/text-generation)  
- [Document Processing Docs](https://ai.google.dev/gemini-api/docs/document-processing)  
- [Image Understanding Docs](https://ai.google.dev/gemini-api/docs/image-understanding)  
- [Audio Processing Docs](https://ai.google.dev/gemini-api/docs/audio)  
- [Structured Output Docs](https://ai.google.dev/gemini-api/docs/structured-output)  


