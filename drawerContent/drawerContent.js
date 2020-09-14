import React from "react";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  ActivityIndicator,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { Feather } from "@expo/vector-icons";

const CustomDrawer = (props) => {
  handleClick = () => {
    props.logout(props.navigation);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ width: undefined, padding: 18, paddingTop: 48 }}
      >
        {props.userPic ? (
          <View>
            {props.userPic === "false" ? (
              <Image
                source={require("../assets/defaultProfile.png")}
                style={styles.profile}
              />
            ) : (
              <Image source={{ uri: props.userPic }} style={styles.profile} />
            )}
          </View>
        ) : (
          <View>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}

        <Text style={styles.name}>{props.userProfile.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoHead}>Class-:</Text>
          {props.userProfile.class ? (
            <Text style={styles.info}> {props.userProfile.class}</Text>
          ) : (
            <Text style={styles.info}> N/A</Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoHead}>Phone No-:</Text>
          <Text style={styles.info}> {props.userProfile.contact}</Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <DrawerItems {...props} />
      </View>
      <View style={styles.bottomDrawerSection}>
        {/* <Button title="Sign Out" onPress={() => handleClick()} /> */}
        <TouchableOpacity style={styles.button} onPress={() => handleClick()}>
          <Text style={styles.textSign}>Sign Out </Text>
          <Feather name="log-out" size={18} color={"white"} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  const { AuthReducer } = state;
  return {
    userProfile: AuthReducer.userProfile,
    userPic: AuthReducer.userPic,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: (navigation) => dispatch(logout(navigation)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  textSign: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#7aa4ce",
    flexDirection: "row",
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    alignItems: "center",
    padding: 15,
  },
  container: {
    flex: 1,
  },
  profile: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8,
  },
  info: {
    color: "#FFF",
    fontSize: 16,
  },
  infoHead: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
