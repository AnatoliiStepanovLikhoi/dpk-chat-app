// import { useContext, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDoc,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "../utils/firebase";
// import { AuthContext } from "../context/AuthContext";
// // import { ChatContext } from "../context/ChatContext";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(false);

//   const { currentUser } = useContext(AuthContext);
//   // const { dispatch } = useContext(ChatContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (querySnapshot.empty) {
//         setError(true);
//         setUser(null);
//       } else {
//         setError(false);
//         querySnapshot.forEach((doc) => {
//           setUser(doc.data());
//         });
//       }
//       // querySnapshot.forEach((doc) => {
//       //   setUser(doc.data());
//       // });
//     } catch (error) {
//       setError(true);
//     }
//   };

//   const handleSelect = async () => {
//     const combineId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;

//     try {
//       const res = await getDoc(doc(db, "chats", combineId));

//       if (!res.exists()) {
//         await setDoc(doc(db, "chats", combineId), { messages: [] });

//         await setDoc(doc(db, "userChats", currentUser.uid), {
//           [combineId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           },

//           [combineId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userChats", user.uid), {
//           [combineId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//           },

//           [combineId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     setUser(null);
//     setUsername("");
//   };

//   const findUser = (event) => setUsername(event.target.value);
//   const handleKey = (e) => e.code === "Enter" && handleSearch();

//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find User"
//           onKeyDown={handleKey}
//           onChange={findUser}
//           value={username}
//         />
//       </div>
//       {error && <span>User is not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           <img src={user.photoURL} alt="avatar" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;

import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

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

  const createChat = async (combineId) => {
    await setDoc(doc(db, "chats", combineId), { messages: [] });

    const currentUserChatData = {
      [combineId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combineId + ".date"]: serverTimestamp(),
    };

    const otherUserChatData = {
      [combineId + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [combineId + ".date"]: serverTimestamp(),
    };

    await Promise.all([
      updateDoc(doc(db, "userChats", currentUser.uid), currentUserChatData),
      updateDoc(doc(db, "userChats", user.uid), otherUserChatData),
    ]);
  };

  const handleSelect = async () => {
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDoc = await getDoc(doc(db, "chats", combineId));

      if (!chatDoc.exists()) {
        await createChat(combineId);
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
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
          value={username}
        />
      </div>
      {error && <span>User is not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
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
