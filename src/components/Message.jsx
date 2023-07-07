import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log(message);
  return (
    <div className="message owner">
      {/* <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/17327920/pexels-photo-17327920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Avatar"
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>Hello world!</p>
        <img
          src="https://images.pexels.com/photos/17327920/pexels-photo-17327920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Avatar"
        />
      </div> */}
    </div>
  );
};

export default Message;
