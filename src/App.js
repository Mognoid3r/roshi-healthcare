// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { useAuth } from "./hooks/useAuth";
// import Login from "./components/Login";
// import LogoutButton from "./components/LogoutButton";
// import Register from "./components/Register";
// import Profile from "./components/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const auth = useAuth();

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>Welcome to Roshi Healthcare</h1>
//           {auth.user ? (
//             <>
//               <p>Welcome, {auth.user.email}</p>
//               <LogoutButton />
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </header>
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/profile">Profile</Link>
//           <Link to="/protected">Protected</Link>
//         </nav>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/profile"
//             element={<ProtectedRoute component={Profile} />}
//           />
//           <Route
//             path="/protected"
//             element={<ProtectedRoute component={ProtectedComponent} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// const ProtectedComponent = () => {
//   return <h2>This is a protected route. Only logged-in users can see this.</h2>;
// };

// export default App;

// src/App.js

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { ThemeProvider } from "./hooks/ThemeContext";
import { AuthProvider } from "./hooks/useAuth";
import "./styles/App.css";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
