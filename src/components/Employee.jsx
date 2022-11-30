import React, { useState, useEffect } from "react";
import "../App.css";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  getFirestore,
  getDoc,
} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
const checkboxes = [
  { id: 1, text: "Reading" },
  { id: 2, text: "Watching Movie" },
  { id: 3, text: "Dancing" },
  { id: 4, text: "Swimming" },
];
function Employee({ id, setEmpId }) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    hobbies: [],
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [update, setUpdate] = useState();
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleCheckChange = (id) => {
    const findIdx = selectedCheckbox.indexOf(id);

    let selected;
    if (findIdx > -1) {
      selected = selectedCheckbox.filter((checkboxId) => checkboxId !== id);
    } else {
      selected = [...selectedCheckbox, id];
    }
    setSelectedCheckbox(selected);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.fname || !formData.lname) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          fname: "",
          lname: "",
          hobbies: [],
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          if (!id) {
            const blogRef = collection(db, "Employee");
            addDoc(blogRef, {
              fname: formData.fname,
              lname: formData.lname,
              hobbies: formData.hobbies,
              image: url,
              hobbies: selectedCheckbox,
              createdAt: Timestamp.now().toDate(),
            });

            console
              .log("addDoc", addDoc)
              .then(() => {
                toast("Employee added successfully", { type: "success" });
                setProgress(0);
              })
              .catch((err) => {
                toast("Error adding employee", { type: "error" });
              });
          } else {
            const editRef = doc(db, "Employee", id);
            updateDoc(editRef, {
              id: id,
              fname: formData.fname,
              lname: formData.lname,
              hobbies: formData.hobbies,
              image: url,
              hobbies: selectedCheckbox,
              createdAt: Timestamp.now().toDate(),
            });
            console
              .log("addDoc", updateDoc)
              .then(() => {
                toast("Employee updateDoc successfully", { type: "success" });
                setProgress(0);
              })
              .catch((err) => {
                toast("Error updateDoc Employee", { type: "error" });
              });
          }
        });
      }
    );
  };
  useEffect(() => {
    id && editHandler(); //fetch data from firestore
  }, [id]);
  const editHandler = async () => {
    const docRef = doc(db, "Employee", id);
    const docSnap = await getDoc(docRef);
    // console.log("docsnap", docSnap.data());
    // setFormData(docSnap.data());
    // selectedCheckbox(docSnap.data().hobbies);
    if (docSnap.exists()) {
      setFormData({ ...docSnap.data() });
      selectedCheckbox(docSnap.data().hobbies);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Employee Registration Form</h2>
      <form action="/action_page.php">
        <div className="mb-3 mt-3">
          <label className="text-left" htmlFor="">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="fname"
            placeholder="Enter first name"
            value={formData.fname}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="text-left">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lname"
            placeholder="Enter last name"
            value={formData.lname}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-check mb-3">
          <h6 className="text-left">Select Hobbies</h6>
          {checkboxes.map((checkbox) => (
            <label key={checkbox.id} className="labels">
              {checkbox.text}
              <input
                value={checkbox.id}
                type="checkbox"
                onChange={() => handleCheckChange(checkbox.text)}
                selected={selectedCheckbox.includes(checkbox.text)}
              />
            </label>
          ))}
        </div>
        {/* Image */}
        <label htmlFor="">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={(e) => handleImageChange(e)}
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
export default Employee;
