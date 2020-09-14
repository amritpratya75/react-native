import * as fb from "../../firebase";

export const fetchVideos = (state) => {
  return async (dispatch, getState) => {
    if (state.class !== "" && state.subject !== "") {
      await fb.videoCollection
        .doc(state.class)
        .get()
        .then((fetchVideos) => {
          var videos = {};
          for (var i in fetchVideos.data()) {
            if (i == state.subject) {
              var video = fetchVideos.data()[i];
              videos = {
                video,
                class: state.class,
                subject: state.subject,
                watched: false,
              };
            }
          }
          dispatch({
            type: "SET_VIDEOS",
            payload: videos,
          });
          dispatch({
            type: "SET_LOADING",
            payload: { videoLoading: false },
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      dispatch({
        type: "SET_LOADING",
        payload: { videoLoading: false },
      });
      if (state.class === "")
        dispatch({
          type: "SET_ERROR",
          payload: { videoError: "Select a class" },
        });
      else if (state.subject === "")
        dispatch({
          type: "SET_ERROR",
          payload: { videoError: "Select a subject" },
        });
    }
  };
};
