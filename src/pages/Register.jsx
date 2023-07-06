import addAvatar from "../assets/addAvatar.png";
import { useState } from "react";
import handleSubmit from "../utils/registerUtil";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    handleSubmit(displayName, email, password, file, setError);
    navigate("/");
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DPK Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="add avatar" />
            <span>Add avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {error && <span>Oops, something went wrong</span>}
        </form>
        <p>
          Do you have account? <Link to="/login">Log in!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
