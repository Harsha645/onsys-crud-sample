import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Calculator } from "./components/Calculator";
import { Contact } from "./components/Contact";
import { NavBar } from "./components/NavBar";
import { User } from "./components/User";
import { UpdateUser } from "./components/UpdateUser";
import { ViewUser } from "./components/ViewUser";
import { UserTable } from "./components/user-table/UserTable";
import { UserTableAnt } from "./components/ant-design/UserTableAnt";
import { Login } from "./components/ant-design/Login";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Calculator />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/more" element={<User />}></Route>
        <Route path="/update-user/:id" element={<UpdateUser />}></Route>
        <Route path="/view-user/:id" element={<ViewUser />}></Route>

        <Route path="/user" element={<UserTable />}></Route>

        <Route path="/ant-design" element={<UserTableAnt />}></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </div>
  );
}

export default App;
