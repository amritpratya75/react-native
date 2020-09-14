import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASlb4spSmLWjsfzkz_2r6cQIpqsPToRzc",
  authDomain: "onlinevidalaya.firebaseapp.com",
  databaseURL: "https://onlinevidalaya.firebaseio.com",
  projectId: "onlinevidalaya",
  storageBucket: "onlinevidalaya.appspot.com",
  messagingSenderId: "1047001803643",
  appId: "1:1047001803643:web:1cbe40523bbbc6fa4fabde",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const firestore = firebase.firestore;
const auth = firebase.auth();
const storageRef = firebase.storage().ref();

const usersCollection = db.collection("users");
const videoCollection = db.collection("videos");
const notesCollection = db.collection("notes");
const quizCollection = db.collection("quiz");
const newsCollection = db.collection("news");

export {
  db,
  auth,
  storageRef,
  firestore,
  usersCollection,
  videoCollection,
  notesCollection,
  quizCollection,
  newsCollection,
};
