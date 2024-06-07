// import React, { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import {
//   doc,
//   deleteDoc,
//   updateDoc,
//   collection,
//   addDoc,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../services/firebase/firebaseConfig";
// import "../styles/program.css";

// const Program = ({ program, setCurrentProgram }) => {
//   const { user } = useAuth();
//   const [workouts, setWorkouts] = useState([]);
//   const [newWorkoutName, setNewWorkoutName] = useState("");

//   useEffect(() => {
//     fetchWorkouts();
//   }, [program]);

//   const fetchWorkouts = async () => {
//     const workoutsCollection = collection(
//       db,
//       "users",
//       user.uid,
//       "programs",
//       program.id,
//       "workouts"
//     );
//     const workoutSnapshot = await getDocs(workoutsCollection);
//     const workoutList = workoutSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setWorkouts(workoutList);
//   };

//   const handleCreateWorkout = async () => {
//     if (!newWorkoutName.trim()) return;

//     const workoutsCollection = collection(
//       db,
//       "users",
//       user.uid,
//       "programs",
//       program.id,
//       "workouts"
//     );
//     const newWorkoutRef = await addDoc(workoutsCollection, {
//       name: newWorkoutName,
//     });
//     const newWorkout = { id: newWorkoutRef.id, name: newWorkoutName };

//     setWorkouts([...workouts, newWorkout]);
//     setNewWorkoutName("");
//   };

//   return (
//     <div className="program-details">
//       <button onClick={() => setCurrentProgram(null)}>Back to Programs</button>
//       <h2>{program.name}</h2>
//       <div className="workouts-list">
//         {workouts.map((workout) => (
//           <div key={workout.id} className="workout-item">
//             {workout.name}
//           </div>
//         ))}
//       </div>
//       <div className="new-workout">
//         <input
//           type="text"
//           value={newWorkoutName}
//           onChange={(e) => setNewWorkoutName(e.target.value)}
//           placeholder="New Workout Name"
//         />
//         <button onClick={handleCreateWorkout}>Add Workout</button>
//       </div>
//     </div>
//   );
// };

// export default Program;

import React from "react";
import "../styles/program.css";
const Program = ({ program }) => {
  return (
    <div className="program-details">
      <h3>{program.programName}</h3>
      <p>{program.programGoal}</p>
      {/* Additional details or functionalities can go here */}
    </div>
  );
};

export default Program;
