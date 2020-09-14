import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Picker,
} from "react-native";
import { connect } from "react-redux";
import {
  editProfile,
  isLoading,
  removeError,
  addClass,
  uploadProfileImage,
  removeProfileImage,
} from "../redux/actions/authAction";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

class Profile extends Component {
  state = {
    name: this.props.userProfile.name,
    contact: this.props.userProfile.contact,
    class: this.props.userProfile.class,
  };

  onNameChange = (val) => {
    this.props.removeError();
    this.setState({
      name: val,
    });
  };
  onContactChange = (val) => {
    this.props.removeError();
    this.setState({
      contact: val,
    });
  };
  onClassChange = (val) => {
    this.props.removeError();
    this.setState({
      class: val,
    });
  };
  edit = () => {
    Keyboard.dismiss();
    this.props.isLoading({ editProfileLoading: true });
    this.props.editProfile(this.state);
  };
  add = () => {
    Keyboard.dismiss();
    this.props.isLoading({ addClassLoading: true });
    this.props.addClass(this.state);
  };
  selectPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });
      if (!result.cancelled) {
        this.props.uploadProfileImage(result.uri).then(() => {
          alert("Added");
        });
      }
    }
  };

  removeProfileImage = () => {
    this.props.removeProfileImage().then(() => {
      alert("Deleted");
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.formBlock}>
            <Text>Name</Text>
            <TextInput
              style={pickerSelectStyles.inputAndroid}
              onChangeText={(val) => this.onNameChange(val)}
              value={this.state.name}
              placeholder={"Enter Your Name"}
            />
          </View>

          <View style={styles.formBlock}>
            <Text>Email</Text>
            <TextInput
              style={pickerSelectStyles.inputAndroid}
              value={this.props.user.email}
              editable={false}
            />
          </View>

          <View style={styles.formBlock}>
            <Text>Phone No.</Text>
            <TextInput
              style={pickerSelectStyles.inputAndroid}
              onChangeText={(val) => this.onContactChange(val)}
              value={this.state.contact}
              placeholder={"Enter Your Phone No."}
            />
          </View>
          {this.props.userProfile.class ? null : (
            <View style={styles.formBlock}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Add your Class
              </Text>
            </View>
          )}

          <View style={styles.formBlock}>
            <Text>Class:-</Text>
            <Picker
              selectedValue={
                this.props.userProfile.class
                  ? this.props.userProfile.class
                  : null
              }
              // style={pickerSelectStyles.inputAndroid}
              onValueChange={(val) => this.onClassChange(val)}
            >
              <Picker.Item label="Class 4" value="Class 4" />
              <Picker.Item label="Class 5" value="Class 5" />
              <Picker.Item label="Class 6" value="Class 6" />
              <Picker.Item label="Class 7" value="Class 7" />
              <Picker.Item label="Class 8" value="Class 8" />
              <Picker.Item label="Class 9" value="Class 9" />
              <Picker.Item label="Class 10" value="Class 10" />
            </Picker>
          </View>

          {this.props.error.profileError ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                {this.props.error.profileError}
              </Text>
            </Animatable.View>
          ) : null}

          {this.props.userProfile.class ? (
            <View style={styles.formBlock}>
              <TouchableOpacity
                onPress={() => this.edit()}
                style={styles.button}
              >
                {this.props.isLoad.editProfileLoading ? (
                  <View style={{ flexDirection: "row" }}>
                    <ActivityIndicator color="white" size="small" />
                    <Text style={styles.textSign}>Loading</Text>
                  </View>
                ) : (
                  <Text style={styles.textSign}>Edit</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formBlock}>
              <TouchableOpacity
                onPress={() => this.add()}
                style={styles.button}
              >
                {this.props.isLoad.addClassLoading ? (
                  <View style={{ flexDirection: "row" }}>
                    <ActivityIndicator color="white" size="small" />
                    <Text style={styles.textSign}>Loading</Text>
                  </View>
                ) : (
                  <Text style={styles.textSign}>Add Class</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          {this.props.userPic && this.props.userPic !== "false" ? (
            <View style={styles.formBlock}>
              <TouchableOpacity
                onPress={() => this.removeProfileImage()}
                style={styles.button}
              >
                <Text style={styles.textSign}>Remove Profile Pic</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formBlock}>
              <TouchableOpacity
                onPress={() => this.selectPicture()}
                style={styles.button}
              >
                <Text style={styles.textSign}>Add Profile Pic</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  const { AuthReducer } = state;
  return {
    user: AuthReducer.user,
    userProfile: AuthReducer.userProfile,
    userPic: AuthReducer.userPic,
    error: AuthReducer.error,
    isLoad: AuthReducer.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    removeProfileImage: () => dispatch(removeProfileImage()),
    uploadProfileImage: (uri) => dispatch(uploadProfileImage(uri)),
    addClass: (state) => dispatch(addClass(state)),
    editProfile: (state) => dispatch(editProfile(state)),
    isLoading: (loading) => {
      dispatch(isLoading(loading));
    },
    removeError: () => {
      dispatch(removeError());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  formBlock: {
    marginVertical: 10,
  },
  container: {
    padding: 20,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#7aa4ce",
    marginTop: 8,
  },
  textSign: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
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
