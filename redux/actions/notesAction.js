import * as fb from "../../firebase";

export const fetchNotes = (state) => {
  return async (dispatch, getState) => {
    if (state.class !== "" && state.subject !== "") {
      await fb.notesCollection
        .doc(state.class)
        .get()
        .then((fetchNotes) => {
          var notes = {};
          for (var i in fetchNotes.data()) {
            if (i == state.subject) {
              var note = fetchNotes.data()[i];
              notes = {
                note,
                class: state.class,
                subject: state.subject,
                watched: false,
              };
            }
          }
          dispatch({ type: "SET_NOTES", payload: notes });
          dispatch({ type: "SET_LOADING", payload: { notesLoading: false } });
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: { notesLoading: false } });
      if (state.class === "")
        dispatch({
          type: "SET_ERROR",
          payload: { notesError: "Select a class" },
        });
      else if (state.subject === "")
        dispatch({
          type: "SET_ERROR",
          payload: { notesError: "Select a subject" },
        });
    }
  };
};
