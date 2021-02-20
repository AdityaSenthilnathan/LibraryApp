import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';
import BookTransactionscreen from './Screens/BookTransactionscreen'
import Searchscreen from './Screens/Searchscreen'
import {  createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export default class App extends React.Component{
  render(){
  return (
    <AppContainer></AppContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

var TabNavigator = createBottomTabNavigator({

  BookTransactionscreen: BookTransactionscreen,
  Searchscreen: Searchscreen
})

const AppContainer = createAppContainer(TabNavigator)