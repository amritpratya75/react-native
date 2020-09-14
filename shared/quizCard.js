import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

class QuizCard extends Component {
  state = {
    selectedIndex: null,
  };

  componentDidUpdate(newProps) {
    const oldProps = this.props.nextQuestion;
    if (oldProps !== newProps.nextQuestion) {
      this.setState({
        selectedIndex: null,
      });
    }
  }

  selected = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  renderItem = (item, index) => {
    const backgroundColor =
      index === this.state.selectedIndex ? "lightblue" : "#ccc";

    return (
      <TouchableOpacity
        onPress={() => {
          this.selected(index);
          this.props.selected(item);
        }}
      >
        <View
          style={[
            styles.quizContent,
            {
              backgroundColor,
            },
          ]}
        >
          <Text style={styles.option}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.quizCard}>
        <View style={styles.quizContentQuestion}>
          <Text style={styles.question}>
            {this.props.shuffleQuestions[this.props.nextQuestion].question}
          </Text>
        </View>
        <FlatList
          data={
            this.props.shuffleQuestions[this.props.nextQuestion].shuffleAnswers
          }
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => "key" + index}
          extraData={this.state.selectedIndex}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { QuizReducer } = state;
  return {
    shuffleQuestions: QuizReducer.quiz.shuffleQuestions,
  };
}

export default connect(mapStateToProps)(QuizCard);

const styles = StyleSheet.create({
  question: {
    fontSize: 22,
    fontWeight: "400",
  },
  option: {
    fontSize: 16,
  },
  quizCard: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 3,
    marginVertical: 6,
    paddingBottom: 20,
  },
  quizContent: {
    padding: 12,
    marginHorizontal: 18,
    marginVertical: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  quizContentQuestion: {
    borderBottomColor: "black",
    padding: 4,
    borderBottomWidth: 1,
    marginHorizontal: 18,
    marginVertical: 15,
  },
});

// const Item = ({ item, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text style={styles.title}>{item.title}</Text>
//   </TouchableOpacity>
// );

// const App = () => {
//   const [selectedId, setSelectedId] = useState(null);

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         style={{ backgroundColor }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default App;
