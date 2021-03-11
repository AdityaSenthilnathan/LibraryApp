import * as React from "react"
import { Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'

export default class BookTransactionscreen extends React.Component {

  constructor() {
    super();
    this.state = {
      buttonstate: "normal",
      bookVal: "",
      Permissions: false,
      scanned: false,
      studentId: ""

    }

  }
  BookIssue = async() => {
      db.collection("Transaction").add({BookId: this.state.bookVal, Date: firebase.firestore.Timestamp.now().toDate(), StudentId: this.state.studentId, Transactiontype: "Issue"});
      db.collection("Students").doc(this.state.studentId).update({IssuedBooks: firebase.firestore.FieldValue.increment(1)}) ;
         db.collection("Books").doc(this.state.bookId).update({Availability: false});
  }
  BookReturn = async() => {
    db.collection("Transaction").add({BookId: this.state.bookVal, Date: firebase.firestore.Timestamp.now().toDate(), StudentId: this.state.studentId, Transactiontype: "Return"});
    db.collection("Students").doc(this.state.studentId).update({IssuedBooks: firebase.firestore.FieldValue.increment(-1)});
    db.collection("Books").doc(this.state.bookId).update({Availability: true});
  }
  HandleTransaction = async() => {

    db.collection("Books").doc(this.state.bookVal).get()

    .then((doc) => {
      var book = doc.data();
      if(book.Availability === true){
        this.BookIssue();
      }
      else{

        this.BookReturn();
      }

    })

    

  }

  AskCameraPermission = async () => {
    const { permval } = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({

      Permissions: permval === "granted",
      buttonstate: "clicked"
    })


  }

  getScanData = (type, data) => {
    this.setState({
      bookVal: data,
      buttonstate: 'normal'
    })

  }

  render() {
    const hasCameraPermissions = this.state.Permissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonstate;

    if (buttonState !== "normal" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal") {
      return (
        <View>
          <View>
          </View>
          <View >
            <TextInput
              placeholder="Book Id"
              value={this.state.bookVal} />
            <TouchableOpacity
              
              onPress={() => {
                this.getCameraPermissions("BookId")
              }}>
              <Text>Scan</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TextInput
         
              placeholder= "Student Id"
              value={this.state.studentId} />
            <TouchableOpacity
           
              onPress={() => {
                this.getCameraPermissions("StudentId")
              }}>
              <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.HandleTransaction()}> <Text>Enter</Text> </TouchableOpacity>
            
          </View>
        </View>
      );
    }
  }
}