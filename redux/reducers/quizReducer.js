const initialState = {
  quiz: {},
};

const QuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUIZ":
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return state;
  }
};

export default QuizReducer;
