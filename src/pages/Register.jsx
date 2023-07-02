import addAvatar from "../assets/addAvatar.png";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DPK Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="add avatar" />
            <span>Add avatar</span>
          </label>
          <button type="button">Sign up</button>
        </form>
        <p>Do you have account? Log in!</p>
      </div>
    </div>
  );
};

export default Register;
