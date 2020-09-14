import * as fb from "../../firebase";
import { storageRef } from "../../firebase";

export const removeError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ERROR",
      payload: {},
    });
  };
};

export const isLoading = (loading) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      payload: loading,
    });
  };
};

export const login = (state, navigation) => {
  return async (dispatch, getState) => {
    if (state.email !== "" && state.password !== "") {
      await fb.auth
        .signInWithEmailAndPassword(state.email, state.password)
        .then(({ user }) => {
          dispatch(downloadProfileImage());
          dispatch(fetchUserProfile(user, navigation));
        })
        .catch((err) => {
          dispatch({
            type: "SET_LOADING",
            payload: {
              loginLoading: false,
            },
          });
          dispatch({
            type: "SET_ERROR",
            payload: { loginError: err.message },
          });
        });
    } else {
      dispatch({
        type: "SET_LOADING",
        payload: {
          loginLoading: false,
        },
      });
      if (state.email === "")
        dispatch({
          type: "SET_ERROR",
          payload: { loginError: "Email Address Field is empty" },
        });
      else if (state.password === "")
        dispatch({
          type: "SET_ERROR",
          payload: { loginError: "Password Field is empty" },
        });
    }
  };
};

export const fetchUserProfile = (user, navigation) => {
  return async (dispatch) => {
    if (user !== null) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      dispatch({
        type: "SET_USER",
        payload: user,
      });
      dispatch({
        type: "SET_USER_PROFILE",
        payload: userProfile.data(),
      });
      if (navigation !== null) navigation.navigate("SignedIn");
    }
  };
};

export const signUp = (state, navigation) => {
  return async (dispatch, getState) => {
    if (
      state.email !== "" &&
      state.password !== "" &&
      state.name !== "" &&
      state.contact !== ""
    ) {
      await fb.auth
        .createUserWithEmailAndPassword(state.email, state.password)
        .then(() => {})
        .catch((err) => {
          dispatch({
            type: "SET_LOADING",
            payload: {
              signUpLoading: false,
            },
          });
          dispatch({
            type: "SET_ERROR",
            payload: {
              signUpError: err.message,
            },
          });
        });
      if (fb.auth.currentUser !== null) {
        const user = fb.auth.currentUser;
        await fb.usersCollection
          .doc(user.uid)
          .set({
            name: state.name,
            contact: state.contact,
            quizScore: [],
          })
          .then()
          .catch((err) => {
            console.log(err.message);
          });
        dispatch(fetchUserProfile(user, navigation));
      }
    } else {
      dispatch({
        type: "SET_LOADING",
        payload: {
          signUpLoading: false,
        },
      });
      if (state.name === "")
        dispatch({
          type: "SET_ERROR",
          payload: {
            signUpError: "Name Field is empty",
          },
        });
      else if (state.email === "")
        dispatch({
          type: "SET_ERROR",
          payload: {
            signUpError: "Email Address Field is empty",
          },
        });
      else if (state.password === "")
        dispatch({
          type: "SET_ERROR",
          payload: {
            signUpError: "Password Field is empty",
          },
        });
      else if (state.contact === "")
        dispatch({
          type: "SET_ERROR",
          payload: {
            signUpError: "Contact Field is empty",
          },
        });
    }
  };
};

export const logout = (navigation) => {
  return async (dispatch, getState) => {
    await fb.auth.signOut();
    dispatch({
      type: "SET_USER_PROFILE",
      payload: {},
    });
    dispatch({
      type: "SET_USER",
      payload: {},
    });
    dispatch({
      type: "SET_USER_PIC",
      payload: "",
    });
    // commit('setVideos',{})
    // commit('setNotes',{})
    // commit('setNoteLink','')
    // commit('setQuiz',{})
    dispatch({
      type: "SET_ERROR",
      payload: {},
    });
    dispatch({
      type: "SET_LOADING",
      payload: {},
    });
    navigation.navigate("SignedOut");
  };
};

export const downloadProfileImage = () => {
  return async (dispatch, getState) => {
    const user = fb.auth.currentUser;
    if (user !== null) {
      await storageRef
        .child("users/" + user.uid + "/profile.jpg")
        .getDownloadURL()
        .then((imgUrl) => {
          dispatch({
            type: "SET_USER_PIC",
            payload: imgUrl,
          });
          // commit("setLoading", {
          //   userPicLoading: false,
          // });
        })
        .catch(() => {
          // commit("setLoading", {
          //   userPicLoading: false,
          // });
          // commit("setUserPic", require("../../assets/defaultProfile.png"));
          dispatch({
            type: "SET_USER_PIC",
            payload: "false",
          });
        });
    }
  };
};

export const editProfile = (state) => {
  return async (dispatch, getState) => {
    if (state.name !== "" && state.contact !== "" && state.class !== "") {
      const userId = fb.auth.currentUser.uid;
      const user = fb.auth.currentUser;
      await fb.usersCollection
        .doc(userId)
        .update({
          name: state.name,
          contact: state.contact,
          class: state.class,
        })
        .then(() => {
          dispatch({
            type: "SET_LOADING",
            payload: { editProfileLoading: false },
          });
        });
      dispatch(fetchUserProfile(user, null));
    } else {
      dispatch({ type: "SET_LOADING", payload: { editProfileLoading: false } });
      if (state.name === "")
        dispatch({
          type: "SET_ERROR",
          payload: { profileError: "Enter your Name" },
        });
      else if (state.contact === "")
        dispatch({
          type: "SET_ERROR",
          payload: { profileError: "Enetr your Contact" },
        });
      else if (state.class === "")
        dispatch({
          type: "SET_ERROR",
          payload: { profileError: "Select a Class" },
        });
    }
  };
};

export const addClass = (state) => {
  return async (dispatch, getState) => {
    if (state.class !== "") {
      const userId = fb.auth.currentUser.uid;
      const user = fb.auth.currentUser;
      await fb.usersCollection.doc(userId).set(
        {
          class: state.class,
        },
        { merge: true }
      );
      dispatch(fetchUserProfile(user, null));
    } else {
      dispatch({ type: "SET_LOADING", payload: { addClassLoading: false } });
      if (state.class === "")
        dispatch({
          type: "SET_ERROR",
          payload: { profileError: "Select a Class" },
        });
    }
  };
};

export const watchedVideos = (state) => {
  return async (dispatch, getState) => {
    const { AuthReducer } = getState();
    if (AuthReducer.userProfile.watchedVideos !== undefined)
      var length = AuthReducer.userProfile.watchedVideos.length;
    const userId = fb.auth.currentUser.uid;
    const user = fb.auth.currentUser;
    if (length >= 5) {
      await fb.usersCollection.doc(userId).update({
        watchedVideos: fb.firestore.FieldValue.arrayRemove(
          AuthReducer.userProfile.watchedVideos[length - 1]
        ),
      });
    }
    await fb.usersCollection.doc(userId).update({
      watchedVideos: fb.firestore.FieldValue.arrayUnion({
        topicName: state.topicName,
        videoLink: state.videoLink,
      }),
    });
    dispatch(fetchUserProfile(user, null));
  };
};

export const watchedNotes = (state) => {
  return async (dispatch, getState) => {
    const { AuthReducer } = getState();
    if (AuthReducer.userProfile.watchedNotes !== undefined)
      var length = AuthReducer.userProfile.watchedNotes.length;
    const userId = fb.auth.currentUser.uid;
    const user = fb.auth.currentUser;
    if (length >= 5) {
      await fb.usersCollection.doc(userId).update({
        watchedNotes: fb.firestore.FieldValue.arrayRemove(
          AuthReducer.userProfile.watchedNotes[length - 1]
        ),
      });
    }
    await fb.usersCollection.doc(userId).update({
      watchedNotes: fb.firestore.FieldValue.arrayUnion({
        topicName: state.topicName,
        class: state.class,
        subject: state.subject,
      }),
    });

    dispatch(fetchUserProfile(user, null));
  };
};

export const quizScore = (state) => {
  return async (dispatch, getState) => {
    const userId = fb.auth.currentUser.uid;
    const user = fb.auth.currentUser;
    await fb.usersCollection.doc(userId).update({
      quizScore: fb.firestore.FieldValue.arrayUnion({
        class: state.class,
        subject: state.subject,
        score: state.score,
      }),
    });
    dispatch(fetchUserProfile(user, null));
  };
};

export const uploadProfileImage = (uri) => {
  return async (dispatch, getState) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const userId = fb.auth.currentUser.uid;
    await storageRef
      .child("users/" + userId + "/profile.jpg")
      .put(blob)
      .then(function () {})
      .catch(() => {});
    dispatch(downloadProfileImage());
  };
};

export const removeProfileImage = () => {
  return async (dispatch, getState) => {
    const userId = fb.auth.currentUser.uid;
    await storageRef
      .child("users/" + userId + "/profile.jpg")
      .delete()
      .then(() => {})
      .catch(() => {});
    dispatch(downloadProfileImage());
  };
};

export const resetPassword = (state) => {
  return (dispatch) => {
    if (state.email !== "") {
      fb.auth
        .sendPasswordResetEmail(state.email)
        .then(function () {
          dispatch({ type: "SET_LOADING", payload: { emailSent: true } });
        })
        .catch(function (err) {
          dispatch({ type: "SET_LOADING", payload: { resetPassword: false } });
          dispatch({
            type: "SET_ERROR",
            payload: { resetPassword: err.message },
          });
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: { resetPassword: false } });
      if (state.email == "")
        dispatch({
          type: "SET_ERROR",
          payload: { resetPassword: "Enter Your E-mail" },
        });
    }
  };
};
