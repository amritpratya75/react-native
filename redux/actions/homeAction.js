import { storageRef } from "../../firebase";

export const fetchNotesLink = (item, navigation) => {
  return async (dispatch, getState) => {
    await storageRef
      .child(
        "notes/" +
          item.class +
          "/" +
          item.subject +
          "/" +
          item.topicName +
          ".pdf"
      )
      .getDownloadURL()
      .then((noteUrl) => {
        dispatch({ type: "SET_NOTES_LINK", payload: noteUrl });
        navigation.navigate("viewNotes");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
