// import { useState } from "react";
import "./assets/normalize.css";
import "./App.css";
import QuoteBox from "./components/QuoteBox";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <QuoteBox />
      <Footer />
    </div>
  );
}

export default App;
