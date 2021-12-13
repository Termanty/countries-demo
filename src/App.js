import React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "./components/Home";
import CountryList from "./components/CountryList";
import CountryPage from "./components/CountryPage";

function CountryPageWrapper(props) {
  const params = useParams();
  return <CountryPage params={params} {...props} />;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/countries">Countries</Link>
      </nav>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/countries" element={<CountryList />} />
          <Route path="/countries/:id" element={<CountryPageWrapper />} />
        </Routes>
      </main>
      <footer>
        <p>copyright Tero Mäntylä</p>
      </footer>
    </div>
  );
}

export default App;
