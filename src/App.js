import logo from "./logo.svg";
import "./App.css";
import { Product } from "./page/add.imaage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/order" element={<Product />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
