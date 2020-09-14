import React, { useState, Component } from "react";
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Linking,
  ActivityIndicator,
  Picker,
} from "react-native";
import Card from "../shared/card";
import { connect } from "react-redux";
import { fetchVideos } from "../redux/actions/videoAction";
import {
  isLoading,
  removeError,
  watchedVideos,
} from "../redux/actions/authAction";
import * as Animatable from "react-native-animatable";

class Videos extends Component {
  state = {
    class: "",
    subject: "",
  };
  onSubToYoutube = async (topicName, videoLink) => {
    this.props.watchedVideos({ topicName: topicName, videoLink: videoLink });
    const youtubeURL = videoLink;
    return Linking.openURL(youtubeURL);
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

  search = () => {
    this.props.isLoading({ videoLoading: true });
    this.props.fetchVideos(this.state);
  };

  render() {
    return (
      <FlatList
        style={[styles.selector, { width: "100%" }]}
        nestedScrollEnabled
        data={["searchData", "list"]}
        keyExtractor={(data) => data}
        renderItem={({ item, index }) => {
          switch (index) {
            case 0:
              return (
                <View>
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
                  <Text style={{ padding: 5, marginTop: 10 }}>
                    Select a Subject-:
                  </Text>
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

                  {this.props.error.videoError ? (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        {this.props.error.videoError}
                      </Text>
                    </Animatable.View>
                  ) : null}

                  <View style={styles.button}>
                    {this.props.isLoad.videoLoading ? (
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
              );
            case 1:
              return (
                <View style={styles.container}>
                  <FlatList
                    data={this.props.videos.video}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.onSubToYoutube(item.topicName, item.videoLink)
                        }
                      >
                        <Card>
                          <Text style={styles.titleText}>{item.topicName}</Text>
                        </Card>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => "key" + index}
                  />
                </View>
              );

            default:
              return null;
          }
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  const { VideoReducer, AuthReducer } = state;
  return {
    videos: VideoReducer.videos,
    error: AuthReducer.error,
    isLoad: AuthReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVideos: (state) => dispatch(fetchVideos(state)),
    isLoading: (loading) => {
      dispatch(isLoading(loading));
    },
    removeError: () => {
      dispatch(removeError());
    },
    watchedVideos: (state) => {
      dispatch(watchedVideos(state));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
