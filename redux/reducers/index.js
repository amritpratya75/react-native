import { combineReducers } from "redux";

import AuthReducer from "./authReducer";
import HomeReducer from "./homeReducer";
import VideoReducer from "./videoReducer";
import NotesReducer from "./notesReducer";
import QuizReducer from "./quizReducer";

const Reducer = combineReducers({
  HomeReducer,
  AuthReducer,
  VideoReducer,
  NotesReducer,
  QuizReducer,
});

export default Reducer;
