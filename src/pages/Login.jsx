const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DPK Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="button">Sign in</button>
        </form>
        <p>Don`t have an account? Register!</p>
      </div>
    </div>
  );
};

export default Login;
