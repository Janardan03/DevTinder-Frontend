import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import {BASE_URL} from "../utils/constants";

const EditProfile = ({user}) => {

  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");

  const saveProfile = async () => {

    setError("");

    try {

      const res = await axios.patch(BASE_URL + "/profile/edit", 
                                  {firstName, lastName, photoUrl, age, gender, about}, {withCredentials: true});
      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
    } catch (err) {
      setError(err.response.data);
    }
  }

  return user && (
    <>
      <div className="flex justify-center mt-10 mb-20">
      <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Edit Profile</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">First Name</legend>
              <input type="text" value={firstName} className="input" onChange={(e) => setfirstName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">last Name</legend>
              <input type="text" value={lastName} className="input" onChange={(e) => setlastName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">Age</legend>
              <input type="text" value={age} className="input" onChange={(e) => setAge(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">Gender</legend>
              <input type="text" value={gender} className="input" onChange={(e) => setGender(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">About</legend>
              <input type="text" value={about} className="input" onChange={(e) => setAbout(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">Photo URL</legend>
              <input type="text" value={photoUrl} className="input" onChange={(e) => setPhotoUrl(e.target.value)}/>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary text-lg" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
      </div>
      <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
      </div>
      {
        showToast && (<div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved successfully</span>
          </div>
        </div>)
      }
    </>
  );
}

export default EditProfile;