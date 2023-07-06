import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

const createUser = async (displayName, email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response.user;
};

const uploadAvatar = (file, displayName) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

const updateUserProfile = (user, displayName, downloadURL) => {
  return updateProfile(user, {
    displayName,
    photoURL: downloadURL,
  });
};

const saveUserToDatabase = (user, displayName, email, downloadURL) => {
  const userData = {
    uid: user.uid,
    displayName,
    email,
    photoURL: downloadURL,
  };
  return setDoc(doc(db, "users", user.uid), userData);
};

const saveChatsToDatabase = (user) => {
  return setDoc(doc(db, "userChats", user.uid), {});
};

const handleSubmit = async (displayName, email, password, file, setError) => {
  try {
    const user = await createUser(displayName, email, password);
    const downloadURL = await uploadAvatar(file, displayName);
    await updateUserProfile(user, displayName, downloadURL);
    await saveUserToDatabase(user, displayName, email, downloadURL);
    await saveChatsToDatabase(user);
  } catch (error) {
    setError(true);
  }
};

export default handleSubmit;
