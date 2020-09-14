import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as fb from "../firebase";
import { connect } from "react-redux";
import {
  fetchUserProfile,
  downloadProfileImage,
} from "../redux/actions/authAction";
import { SafeAreaView } from "react-navigation";

class Loading extends Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    // NetInfo.isConnected.fetch().then((isConnected) => {
    //   if (isConnected) {
    fb.auth.onAuthStateChanged((user) => {
      this.props.fetchUserProfile(user, this.props.navigation);
      this.props.downloadProfileImage();
      this.props.navigation.navigate(user ? "SignedIn" : "SignedOut");
    });
    //   } else {
    //     this.setState({
    //       isConnected: false,
    //     });
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isConnected ? (
          <View>
            <StatusBar backgroundColor="#7aa4ce" barStyle="light-content" />
            <Text style={styles.text}>Loading</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ backgroundColor: "red" }}>
            <StatusBar backgroundColor="#7aa4ce" barStyle="light-content" />
            <Text style={styles.noInternet}>No Internet Connection</Text>
          </View>
        )}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserProfile: (user, navigation) =>
      dispatch(fetchUserProfile(user, navigation)),
    downloadProfileImage: () => dispatch(downloadProfileImage()),
  };
}
export default connect(null, mapDispatchToProps)(Loading);

const styles = StyleSheet.create({
  noInternet: {
    color: "white",
    fontSize: 12,
    padding: 10,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
