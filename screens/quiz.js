import React, { useState, Component } from "react";
import {
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  Picker,
} from "react-native";
import QuizCard from "../shared/quizCard";
import { connect } from "react-redux";
import { isLoading, removeError, quizScore } from "../redux/actions/authAction";
import * as Animatable from "react-native-animatable";
import { fetchQuiz } from "../redux/actions/quizAction";

class Quiz extends Component {
  state = {
    index: 0,
    class: "",
    subject: "",
    showQuizCard: false,
    showSubmitButton: false,
    score: 0,
    answer: {},
    showScore: false,
  };

  onClassChange = (val) => {
    this.props.removeError();
    this.setState({
      class: val,
    });
  };

  onSubjectChange = (val) => {
    this.props.removeError();
    this.setState({
      subject: val,
    });
  };

  showQuizCard = () => {
    if (this.props.quiz.shuffleQuestions.length === 1) {
      this.setState({
        showSubmitButton: true,
      });
    }
    this.setState({ showQuizCard: true });
  };

  search = async () => {
    this.props.isLoading({ quizLoading: true });
    await this.props.fetchQuiz(this.state);
    this.setState({ showQuizCard: false });
    if (this.props.quiz.shuffleQuestions !== undefined)
      Alert.alert(
        "Quiz",
        "There are " +
          this.props.quiz.shuffleQuestions.length +
          " MCQ Questions in this Subject ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Take Quiz",
            onPress: () => this.showQuizCard(),
          },
        ],
        { cancelable: false }
      );
  };

  computeAnswer = (answer) => {
    var newAnswer = {};
    var questIndex = this.state.index;
    newAnswer[questIndex] = answer;
    this.setState({
      answer: { ...this.state.answer, ...newAnswer },
    });
  };

  submitAnswer = () => {
    var score = 0;
    for (var i = 0; i < this.props.quiz.shuffleQuestions.length; i++) {
      var correct_answer = this.props.quiz.shuffleQuestions[i].correct_answer;
      var selected_answer = this.state.answer[i];
      // console.log(correct_answer + " " + selected_answer);
      if (correct_answer === selected_answer) {
        var score = score + 1;
      }
    }
    this.setState({
      score: score,
    });
    this.setState({
      showScore: true,
    });
  };

  nextQuestion = () => {
    this.setState({
      index: this.state.index + 1,
    });
    if (this.state.index > this.props.quiz.shuffleQuestions.length - 3) {
      this.setState({
        showSubmitButton: true,
      });
    }
  };

  backFromScore = () => {
    this.props.quizScore({
      class: this.state.class,
      subject: this.state.subject,
      score: this.state.score,
    });
    this.setState({
      index: 0,
      score: 0,
      showQuizCard: false,
      showScore: false,
      showSubmitButton: false,
      answer: {},
    });
  };
  render() {
    return (
      <View>
        {this.state.showQuizCard ? null : (
          <View style={styles.selector}>
            <Text style={{ padding: 5 }}>Select a Class-:</Text>
            <Picker
              selectedValue={this.state.class}
              // style={pickerSelectStyles.inputAndroid}
              onValueChange={(val) => this.onClassChange(val)}
            >
              <Picker.Item label="Select a Class" value="" />
              <Picker.Item label="Class 1" value="Class 1" />
              <Picker.Item label="Class 2" value="Class 2" />
              <Picker.Item label="Class 3" value="Class 3" />
              <Picker.Item label="Class 4" value="Class 4" />
            </Picker>
            <Text style={{ padding: 5, marginTop: 10 }}>Select a Class-:</Text>
            <Picker
              selectedValue={this.state.subject}
              // style={pickerSelectStyles.inputAndroid}
              onValueChange={(val) => this.onSubjectChange(val)}
            >
              <Picker.Item label="Select a Subject" value="" />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Mathematics" value="Mathematics" />
              <Picker.Item label="Chemistry" value="Chemistry" />
            </Picker>

            {this.props.error.quizError ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {this.props.error.quizError}
                </Text>
              </Animatable.View>
            ) : null}

            <View style={styles.button}>
              {this.props.isLoad.quizLoading ? (
                <ActivityIndicator color="#7aa4ce" size="large" />
              ) : (
                <Button
                  onPress={() => this.search()}
                  title="Search"
                  color="#7aa4ce"
                />
              )}
            </View>
          </View>
        )}
        {this.state.showScore ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>
              Your Score is {this.state.score}/
              {this.props.quiz.shuffleQuestions.length}
            </Text>
            <TouchableOpacity
              onPress={() => this.backFromScore()}
              style={styles.button1}
            >
              <Text style={styles.textSign}>Finish</Text>
            </TouchableOpacity>
          </View>
        ) : this.state.showQuizCard ? (
          <View style={styles.selector}>
            <View style={styles.container}>
              <QuizCard
                nextQuestion={this.state.index}
                selected={(answer) => this.computeAnswer(answer)}
              />
            </View>
            <View style={styles.nextButton}>
              {this.state.showSubmitButton ? (
                <Button
                  onPress={() => this.submitAnswer()}
                  title="Submit"
                  color="#7aa4ce"
                />
              ) : (
                <Button
                  onPress={() => this.nextQuestion()}
                  title="Next"
                  color="#7aa4ce"
                />
              )}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { AuthReducer, QuizReducer } = state;
  return {
    error: AuthReducer.error,
    isLoad: AuthReducer.isLoading,
    quiz: QuizReducer.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    quizScore: (state) => dispatch(quizScore(state)),
    fetchQuiz: (state) => dispatch(fetchQuiz(state)),
    isLoading: (loading) => {
      dispatch(isLoading(loading));
    },
    removeError: () => {
      dispatch(removeError());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
  nextButton: {
    width: 100,
    alignSelf: "flex-end",
    padding: 10,
  },
  container: {
    paddingTop: 20,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  button1: {
    height: 30,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#7aa4ce",
    marginTop: 8,
  },
  textSign: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  button: {
    paddingTop: 15,
  },
  selector: {
    padding: 20,
  },
  onePicker: {
    height: 60,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
