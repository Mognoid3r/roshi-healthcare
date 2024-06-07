import React, { useState } from "react";
import "../../styles/ProgramBuilder.css";

const ProgramBuilder = ({ program }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");

  const addWorkout = () => {
    setWorkouts([...workouts, { name: workoutName, exercises: [] }]);
    setWorkoutName("");
  };

  return (
    <div className="program-builder">
      <h3>{program.name}</h3>
      <input
        type="text"
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      <button onClick={addWorkout}>Add Workout</button>
      <div className="workouts-list">
        {workouts.map((workout, index) => (
          <div key={index} className="workout-item">
            {workout.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramBuilder;
