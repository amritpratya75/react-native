import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  Linking,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Card from "../shared/card";
import { connect } from "react-redux";
import { fetchNotesLink } from "../redux/actions/homeAction";

const Home = (props) => {
  const watchedVideos = props.userProfile.watchedVideos;

  const onSubToYoutube = async (videoLink) => {
    const youtubeURL = videoLink;
    return Linking.openURL(youtubeURL);
  };
  const openViewNotes = async (item) => {
    props.fetchNotesLink(item, props.navigation);
  };
  return (
    <FlatList
      style={[styles.container, { width: "100%" }]}
      nestedScrollEnabled
      data={["videos", "notes", "score"]}
      keyExtractor={(data) => data}
      renderItem={({ item, index }) => {
        switch (index) {
          case 0:
            return (
              <Animatable.View
                animation="bounceInLeft"
                duration={1000}
                style={styles.content}
              >
                <Text style={styles.header}>Videos</Text>
                {props.userProfile.watchedVideos ? (
                  <FlatList
                    data={watchedVideos.reverse()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => onSubToYoutube(item.videoLink)}
                      >
                        <Card>
                          <Text style={styles.titleText}>{item.topicName}</Text>
                        </Card>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => "key" + index}
                  />
                ) : (
                  <Animatable.View
                    animation="bounceInRight"
                    duration={1000}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 15,
                    }}
                  >
                    <Text>No Videos Watched</Text>
                  </Animatable.View>
                )}
              </Animatable.View>
            );
          case 1:
            return (
              <Animatable.View
                animation="bounceInRight"
                duration={1000}
                style={styles.content}
              >
                <Text style={styles.header}>Notes</Text>
                {props.userProfile.watchedNotes ? (
                  <FlatList
                    data={props.userProfile.watchedNotes.reverse()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => openViewNotes(item)}>
                        <Card>
                          <Text style={styles.titleText}>{item.topicName}</Text>
                        </Card>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => "key" + index}
                  />
                ) : (
                  <Animatable.View
                    animation="bounceInLeft"
                    duration={1000}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 15,
                    }}
                  >
                    <Text>No Notes Watched</Text>
                  </Animatable.View>
                )}
              </Animatable.View>
            );
          case 2:
            return (
              <Animatable.View
                animation="bounceInLeft"
                duration={1000}
                style={styles.content}
              >
                <Text style={styles.header}>Score</Text>
                {props.userProfile.quizScore ? (
                  <FlatList
                    data={props.userProfile.quizScore}
                    renderItem={({ item }) => (
                      <Card>
                        <Text style={styles.titleText}>
                          Class -:{item.class}
                        </Text>
                        <Text style={styles.titleText}>
                          Subject -:{item.subject}
                        </Text>
                        <Text style={styles.titleText}>
                          Your Score -: {item.score}
                        </Text>
                      </Card>
                    )}
                    keyExtractor={(item, index) => "key" + index}
                  />
                ) : (
                  <Animatable.View
                    animation="bounceInRight"
                    duration={1000}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 15,
                    }}
                  >
                    <Text>No Quiz Taken</Text>
                  </Animatable.View>
                )}
              </Animatable.View>
            );
          default:
            return null;
        }
      }}
    />
  );
};

function mapStateToProps(state) {
  const { AuthReducer } = state;
  return {
    userProfile: AuthReducer.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotesLink: (item, navigation) =>
      dispatch(fetchNotesLink(item, navigation)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  content: {
    marginVertical: 18,
  },
  header: {
    fontSize: 16,
    backgroundColor: "#C0C0C0",
    color: "black",
    fontWeight: "500",
    padding: 10,
    marginVertical: 3,
  },
  container: {
    padding: 20,
  },
});
