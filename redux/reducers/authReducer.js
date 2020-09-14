const initialState = {
  user: {},
  userPic: "",
  userProfile: {
    name: "",
    class: "",
    contact: "",
  },
  error: {},
  isLoading: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_USER_PIC":
      return {
        ...state,
        userPic: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
