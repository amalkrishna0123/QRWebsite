import Home from "./components/Home";
import Loader from "./components/Loader";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Beef from "./CategoryList/Beef";
import Biriyani from "./CategoryList/Biriyani";
import Chicken from "./CategoryList/Chicken";
import Drinks from "./CategoryList/Drinks";
import Fish from "./CategoryList/Fish";
import Rice from "./CategoryList/Rice";
import Vegetable from "./CategoryList/Vegetable";
import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once on component mount

  return (
    <Router>
      {loading ? (
        <Loader /> // Display Loader directly
      ) : (
        <Routes>
          <Route path='/*' element={<Home />}>
            {/* Food List */}
            {/* Default Navigate */}
            <Route index element={<Navigate to="rice" replace />} />
            <Route path="rice" element={<Rice />} />
            <Route path="biriyani" element={<Biriyani />} />
            <Route path="vegetable" element={<Vegetable />} />
            <Route path="chicken" element={<Chicken />} />
            <Route path="beef" element={<Beef />} />
            <Route path="fish" element={<Fish />} />
            <Route path="drinks" element={<Drinks />} />
          </Route>

          <Route path='/AdminLogin' element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
