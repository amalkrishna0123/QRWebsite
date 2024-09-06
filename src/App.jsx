import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Loader from "./components/Loader";
import Login from "./components/Login";
import CategoryPage from "./CategoryList/CategoryPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":category" element={<CategoryPage />} /> {/* Nested route for categories */}
          </Route>
          <Route path="/AdminLogin" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
