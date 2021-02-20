import * as React from "react"
import { Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'


export default class BookTransactionscreen extends React.Component {

  constructor() {
    super();
    this.state = {
      buttonstate: "normal",
      bookVal: "",
      Permissions: false,
      scanned: false

    }

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

    const buttonstate = this.state.buttonstate
    if (buttonstate === "normal") {
      return (
        <View>
          <Text> (this.state.Permissions)? this.state.bookVal: "Allow camera Permissions"</Text>
          <TextInput></TextInput>
          <TouchableOpacity onPress={this.AskCameraPermission}> <Text> Allow camera Permission </Text></TouchableOpacity>

        </View>
      )
    }
    else if (this.state.Permissions === true && buttonstate === "clicked") {
      return (
        <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.getScanData}></BarCodeScanner>
      )
    }


  }
}