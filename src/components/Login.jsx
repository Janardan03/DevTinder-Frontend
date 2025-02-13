import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
        
      const res = await axios.post(BASE_URL + "/login", { emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data));
      navigate("/");

    }catch(err){
      setError(err?.response?.data);
    }
  }

  const handleSignUp = async() => {

    try {

      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data.data));
      navigate("/profile");

    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
          {!isLoginForm && <> <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">First Name</legend>
              <input type="text" value={firstName} className="input" onChange={(e) => setFirstName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">Last Name</legend>
              <input type="text" value={lastName} className="input" onChange={(e) => setLastName(e.target.value)}/>
            </fieldset> </>}
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">Email ID</legend>
              <input type="text" value={emailId} className="input" onChange={(e) => setEmailId(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend text-sm">Password</legend>
              <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)}/>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary text-lg" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className="cursor-pointer mt-4" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}</p>
        </div>
      </div>
    </div>
  );
}

export default Login