import Image from "../assets/img.png";
import Attachment from "../assets/attach.png";

const Input = () => {
  return (
    <div className="input">
      <input
        className="inputMessage"
        type="text"
        placeholder="Type your message..."
      />
      <div className="send">
        <img src={Attachment} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
