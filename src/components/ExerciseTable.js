import React, { useState, useEffect } from "react";
import axios from "axios";

const ExerciseTable = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/exercises");
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExercise = { name, reps, sets };
      const response = await axios.post(
        "http://localhost:5000/api/exercises",
        newExercise
      );
      setExercises([...exercises, response.data]);
      setName("");
      setReps("");
      setSets("");
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  return (
    <div>
      <h2>Exercises</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Exercise Name"
          required
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Reps"
          required
        />
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          placeholder="Sets"
          required
        />
        <button type="submit">Add Exercise</button>
      </form>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.name} - {exercise.reps} reps x {exercise.sets} sets
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseTable;
