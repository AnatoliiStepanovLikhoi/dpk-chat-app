import Image from "../assets/img.png";
import Attachment from "../assets/attach.png";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = () => {
    if (image) {
    } else {
    }
  };

  return (
    <div className="input">
      <input
        className="inputMessage"
        type="text"
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src={Attachment} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
