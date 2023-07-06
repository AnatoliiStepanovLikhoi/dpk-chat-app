import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError(true);
        setUser(null);
      } else {
        setError(false);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      setError(true);
    }
  };

  const findUser = (event) => setUsername(event.target.value);
  const handleKey = (e) => e.code === "Enter" && handleSearch();

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find User"
          onKeyDown={handleKey}
          onChange={findUser}
        />
      </div>
      {error && <span>User is not found!</span>}
      {user && (
        <div className="userChat">
          <img src={user.photoURL} alt="avatar" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
