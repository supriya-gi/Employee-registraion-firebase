import { useEffect, useState } from "react";
import "../App.css";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getFirestore,
} from "firebase/firestore";
import React from "react";
import { db } from "../firebaseConfig";
import DeleteEmp from "./DeleteEmp";
function EmployeeAdd({ getEmpId }) {
  const [employee, setEmployee] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  useEffect(() => {
    const blogRef = collection(db, "Employee");
    const q = query(blogRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const employee = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployee(employee);
      console.log("snapshot");
      console.log("employee", employee);
    });
  }, []);
  const db = getFirestore();
  return (
    <div>
      {employee.length === 0 ? (
        <p>No employee found !</p>
      ) : (
        employee.map(({ id, fname, lname, hobbies, image, createdAt }) => (
          <div className="border mt-3" key={id}>
            <div className="row ">
              <div className="col-md-3 d-flex">
                <img src={image} alt="image" className="img-fluid" />
              </div>
              <div className="col-md-6 ">
                <p>
                  <b className="text-left">First Name: </b>
                  {fname}
                </p>
                <p>
                  <b className="text-left">last Name: </b>
                  {lname}
                </p>
                <p>
                  <b className="text-left">Hobbies: </b>
                  {hobbies}
                </p>
                <div className="seperate">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      getEmpId(id);
                      // console.log("test id", id);
                      // const selectedId = employee.find((emp) => emp.id === id);
                      // console.log(selectedId);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteEmp id={id} image={image} />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EmployeeAdd;
