import { async } from "@firebase/util";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { toast } from "react-toastify";
import { storage, db } from "../firebaseConfig";

function DeleteEmp({ id, image }) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Employee", id));
      toast("Employee delete successfully", { type: "success" });
      const storageRef = ref(storage.image);
      await deleteObject(storageRef);
    } catch (error) {
      toast("Employee delete successfully", { type: "error" });
    }
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteEmp;
