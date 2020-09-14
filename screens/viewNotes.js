import React from "react";
import { View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { connect } from "react-redux";

const viewNotes = (props) => {
  return (
    <PDFReader
      source={{
        uri: props.notesLink,
      }}
      withPinchZoom={true}
      withScroll={true}
    />
  );
};

function mapStateToProps(state) {
  const { HomeReducer } = state;
  return {
    notesLink: HomeReducer.notesLink,
  };
}

export default connect(mapStateToProps)(viewNotes);
