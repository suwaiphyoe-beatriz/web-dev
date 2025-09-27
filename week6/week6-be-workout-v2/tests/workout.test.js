const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("when there is initially some workouts saved", () => {
  let initialWorkoutsInDb = [];
  beforeEach(async () => {
    await Workout.deleteMany({});

    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);

    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);
    initialWorkoutsInDb = await workoutsInDb();   
  });

  it("should return workouts as json", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should successfully add a new workout", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(initialWorkoutsInDb.length + 1);
  });

  // Test 1: READ Single Workout
  it("should read a single workout by its valid ID", async () => {
    const workoutToView = initialWorkoutsInDb[0];

    const response = await api
      .get(`/api/workouts/${workoutToView.id}`)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(workoutToView.title);
  });

  // Test 2: UPDATE Workout
  it("should succeed with status 200 and update the workout when ID and data are valid", async () => {
    const workoutToUpdate = initialWorkoutsInDb[0];
    const updatePayload = {
      title: "UPDATED TITLE",
      reps: 99,
      load: 999,
    };

    const response = await api
      .patch(`/api/workouts/${workoutToUpdate.id}`)
      .set("Authorization", "bearer " + token)
      .send(updatePayload)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(updatePayload.title);
    expect(response.body.reps).toBe(updatePayload.reps);

    const workoutsAtEnd = await workoutsInDb();
    const updatedWorkout = workoutsAtEnd.find((w) => w.id === workoutToUpdate.id);
    expect(updatedWorkout.title).toBe(updatePayload.title);
  });
});
describe("deletion of a workout", () => {
  let initialWorkoutsInDb = [];

  beforeEach(async () => {
  try {
    await Workout.deleteMany({});

    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);

    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);

    initialWorkoutsInDb = await workoutsInDb();
  } catch (err) {
    console.error("beforeEach error:", err);
  }
});

  // Test 3: DELETE Workout
  it("should succeed with status code 204 when deleting a workout with a valid ID", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    await api
      .delete(`/api/workouts/${workoutToDelete.id}`)
      .set("Authorization", "bearer " + token)
      .expect(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(workoutsAtStart.length - 1);
    
    const deletedWorkout = workoutsAtEnd.find((w) => w.id === workoutToDelete.id);
    expect(deletedWorkout).toBeUndefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
