import * as fb from "../../firebase";
import _ from "lodash";

export const fetchQuiz = (state) => {
  return async (dispatch, getState) => {
    // const scores = getState().AuthReducer.userProfile.quizScore
    if (state.class !== "" && state.subject !== "") {
      await fb.quizCollection
        .doc(state.class)
        .get()
        .then((fetchQuiz) => {
          var quizes = {};
          for (var i in fetchQuiz.data()) {
            if (i == state.subject) {
              var quiz = fetchQuiz.data()[i];
              quizes = {
                quiz,
                class: state.class,
                subject: state.subject,
              };
            }
          }

          dispatch(shuffleQuest(quizes));
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: { quizLoading: false } });
      if (state.class === "")
        dispatch({
          type: "SET_ERROR",
          payload: { quizError: "Select a Class" },
        });
      else if (state.subject === "")
        dispatch({
          type: "SET_ERROR",
          payload: { quizError: "Select a Subject" },
        });
    }
  };
};

export const shuffleQuest = (quiz) => {
  return async (dispatch, getState) => {
    var shuffleQuestions = _.shuffle(quiz.quiz);
    for (var i = 0; i < shuffleQuestions.length; i++) {
      var answers = [...shuffleQuestions[i].incorrect_answer];
      answers.push(shuffleQuestions[i].correct_answer);
      var shuffleAnswers = _.shuffle(answers);
      shuffleQuestions[i].shuffleAnswers = shuffleAnswers;
    }
    var res = {
      shuffleQuestions,
      class: quiz.class,
      subject: quiz.subject,
    };
    if (res.shuffleQuestions.length > 0) {
      dispatch({
        type: "SET_LOADING",
        payload: { showQuiz: true, quizLoading: false },
      });
    } else {
      dispatch({ type: "SET_LOADING", payload: { quizLoading: false } });
    }
    dispatch({ type: "SET_QUIZ", payload: res });
  };
};
