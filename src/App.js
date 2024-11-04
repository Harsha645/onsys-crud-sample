import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Calculator } from "./components/Calculator";
import { Contact } from "./components/Contact";
import { NavBar } from "./components/NavBar";
import { User } from "./components/User";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Calculator />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/more" element={<User />}></Route>
      </Routes>
    </div>
  );
}

export default App;
