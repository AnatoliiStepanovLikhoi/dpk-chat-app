const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">DPK Chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/17327920/pexels-photo-17327920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>Camander</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
