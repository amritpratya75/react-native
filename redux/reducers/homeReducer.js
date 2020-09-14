const initialState = {
  notesLink: "",
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTES_LINK":
      return {
        ...state,
        notesLink: action.payload,
      };
    default:
      return state;
  }
};

export default HomeReducer;
