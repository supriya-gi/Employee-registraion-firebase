import { useState } from "react";
import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "./components/Employee";
import EmployeeAdd from "./components/EmployeeAdd";

function App() {
  const [empId, setEmpId] = useState("");
  const getEmployeeIdHandler = (id) => {
    console.log("id", id);
    setEmpId(id);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-4  bg">
            <Employee id={empId} setEmpId={setEmpId} />
          </div>

          <div className="col-md-8">
            <EmployeeAdd getEmpId={getEmployeeIdHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
